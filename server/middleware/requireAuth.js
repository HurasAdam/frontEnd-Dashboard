const jwt = require("jsonwebtoken");
const User = require("../db/models/user");
const Project = require("../db/models/project");
const requireAuth = async (req, res, next) => {
  // verify user is authenticated
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }
  const token = authorization.split(" ")[1];
  try {
    const { id } = jwt.verify(token, process.env.SECRET);
    req.user = await User.findOne({ _id: id });
    req.role = await User.findOne({ _id: id }).select("role");
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request is not authorized" });
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
  const { id } = req.params;
  const { id: userId } = req.user;

  //find project in DB
  const proj = await Project.findOne({ _id: id });

  //check if user is a member of project
  const isContributor = proj.contributors.some((item) => item === userId);

  if (!isContributor) {
    res.status(403);
    return res.send("You dont have permissions");
  }

  next();
};

module.exports = [requireAuth, authRole, authMembership];
