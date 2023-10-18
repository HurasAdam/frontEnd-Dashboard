const jwt = require("jsonwebtoken");
const User = require("../db/models/user");
const Project = require("../db/models/project");
const Note = require("../db/models/note");
const requireAuth = async (req, res, next) => {
  // verify user is authenticated
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }
  const token = authorization.split(" ")[1];
  try {
    const { id } = jwt.verify(token, process.env.SECRET);
   const decoded= jwt.verify(token, process.env.SECRET)
  
    req.user = await User.findOne({ _id: id });
    req.role = await User.findOne({ _id: id }).select("role");


const timestamp = decoded.exp;
const expirationDate = new Date(timestamp*1000);




if(Date.now()>=expirationDate){
  throw new Error("EXPIRED")
}

    next();
  } catch (error) {
    console.log(error);
    if(error.message==="jwt expired"){
      return res.status(401).json({message:"Token Expired"})
    }
    return res.status(403).json({message:"Invalid Token"})
  }
};

const authRole = (...roles) => {
  const rolesArray = [...roles];

  return async (req, res, next) => {
    const { role } = req.role;
   
    const isRoleAuth = rolesArray.some((r) => r.includes(role));

    if (!isRoleAuth) {
      res.status(403);
      return res.send("Not Allowed");
    }

    if (isRoleAuth) {
      next();
    }
  };
};

const authMembership = async (req, res, next) => {
  const { role } = req.role;

  //check if is admin, if yes skipp authmembership if no run auth membership 
  if (role === "user") {
    //user ID
    const { id: userId } = req.user;
    //ticket ID
    const { id } = req.params;
    //find ticket in db and insert project property
    const ticket = await Note.find({ _id: id }).select("project");

    //check project ID which ticket belongs to
    const projectId = ticket.map((object) => {
      return object.project._id.toString();
    });

    //find in DB project which ticket belongs to
    const project = await Project.find({ _id: projectId });

    //check if user is part of project which ticket belongs to
    const isAContributor = project.some((p) => {
      return p.contributors.some((user) => user._id.toString() === userId);
    });

    if (!isAContributor) {
      return res
        .status(403)
        .json({ error: "To edit this ticket you have to be part of project" });
    }

    if (isAContributor) {
      next();
    }
  } else if (role === "admin") {
  
    next();
  }
};

module.exports = [requireAuth, authRole, authMembership];
