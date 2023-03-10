const jwt = require("jsonwebtoken");
const User = require("../db/models/user");

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

const authRole = (role) => {
  const userRole = role
  return async(req, res, next) => {
    
    const {role} = req.role;
  
    if(role!==userRole){
    res.status(403)
      return res.send('Not allowed')
    }
    
    next()
  };
  
};

module.exports = [requireAuth, authRole];
