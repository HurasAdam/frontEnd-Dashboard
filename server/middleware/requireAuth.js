const jwt = require("jsonwebtoken");
const User = require("../db/models/user");

const requireAuth = async (req, res, next) => {
  // verify user is authenticated
  const { authorization } = req.headers;
  const param = req.params;
  console.log("Middleware");
  if (!authorization) {
    console.log(param);
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



// const authRole = async (role) => {
const authRole= async(req, res, next) => {
    const role = req.role;
    console.log(role);
    res.status(200)
    next();
    // if(role!==role){
    //   res.status(401).json('Not allowed')
    // }
}



  
module.exports = [requireAuth, authRole];

