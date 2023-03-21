const User = require("../db/models/user");
const Project = require("../db/models/project");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");

const createToken = (id) => {
  const token = jwt.sign({ id }, process.env.SECRET, { expiresIn: "24h" });
  return token;
};

// login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;


  try {
    if (!email || !password) {
      throw Error("All fielnds needs to be filled");
    }
    const user = await User.findOne({ email });
   const role =user.role
    if (!user) {
      throw Error("Inncorect Email");
    }
    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      throw Error("Inncorect Password");
    } else {
      const token = createToken(user._id);
      res.status(200).json({ email, token,role});
    }
  } catch (Error) {
    console.log(Error);
    res.status(400).json(Error.message);
  }
};

// signup a user
const signupUser = async (req, res) => {
  let { name, surname, email, password, role } = req.body;

  if (!role) {
    role = "user";
  }
  if (role) {
    role = role;
  }

  try {
    if (!email || !password || !name || !surname) {
      throw Error("All fields have to be filled");
    }

    if (!validator.isEmail(email)) {
      throw Error("Email is not valid");
    }

    if (!validator.isStrongPassword(password)) {
      throw Error("Password not strong enough");
    }

    const exists = await User.findOne({ email });
    if (exists) {
      throw Error("Email already in use ");
    }

    if (!exists) {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);

      const user = await User.create({
        name,
        surname,
        email,
        password: hashPassword,
        role,
      });
      const token = createToken(user._id);

      res.status(200).json({ name, surname, email, token, role });
    }
  } catch (Error) {
    console.log(Error);
    res.status(400).json(Error.message);
  }
};

const getUserList = async (req, res) => {
  const userList = await User.find({});

  const result = userList.map((user) => {
    return {
      _id: user._id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      role: user.role,
    };
  });

  res.status(200).json(result);
};

const getAvalibleUserList = async (req, res) => {
  const { project } = req.query;

  //get currentProject
  const asignedToProject = await Project.find({ _id: project });

  //get ID of users asigned to the project
  const contributorsList = asignedToProject.map((ob) => ob.contributors).flat();

  //get full list of Users
  const userList = await User.find({});

  //filter userLis and return only those users whos are not asigned to the project
  const notAsignedYet = userList.filter(
    (user) =>
      contributorsList.find(
        (contributor) => user._id.toString() === contributor._id.toString()
      ) === undefined
  );
  const result = notAsignedYet.map((user) => {
    return {
      _id: user._id,
      name: user.name,
      surname: user.surname,
      role: user.role,
    };
  });

  res.status(200).json(result);
};



const updateUserData=async(req,res)=>{

  const {id,role}=req.body
  

const updateUserRole= await User.findOneAndUpdate( { _id:id} , { $set: { role : role  }})
console.log(updateUserRole)
res.status(200).json()
}

module.exports = { signupUser, loginUser, getUserList, getAvalibleUserList,updateUserData };
