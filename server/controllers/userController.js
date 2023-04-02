const User = require("../db/models/user");
const Project = require("../db/models/project");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const { convertDate } = require("../utils/dateConvert");

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

    if (!user) {
      throw Error("Inncorect Email");
    }
    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      throw Error("Inncorect Password");
    } else {
      const token = createToken(user._id);
      res
        .status(200)
        .json({ email, token, role: user.role, userAvatar: user.userAvatar });
    }
  } catch (Error) {
    console.log(Error);
    res.status(400).json(Error.message);
  }
};

// signup a user
const signupUser = async (req, res) => {
  let {
    name,
    surname,
    email,
    password,
    role,
    userAvatar,
    phone,
    birthDay,
    adress,
    gender,
  } = req.body;

  if (!role) {
    role = "user";
  }
  if (role) {
    role = role;
  }

  if (!userAvatar) {
    userAvatar = "";
  }
  if (!phone) {
    phone = "";
  }
  if (!birthDay) {
    birthDay = "";
  }
  if (!adress) {
    adress = "";
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
        gender,
        role,
        userAvatar,
        phone,
        birthDay,
        adress,
        createdAt: convertDate(),
      });
      const token = createToken(user._id);

      res.status(200).json({
        name,
        surname,
        email,
        token,
        role,
        userAvatar,
        phone,
        birthDay,
      });
    }
  } catch (Error) {
    console.log(Error);
    res.status(400).json(Error.message);
  }
};

const getUserData = async (req, res) => {
  const { id } = req.params;

  const user = await User.findOne({ _id: id });

  const result = {
    name: user.name,
    surname: user.surname,
    email: user.email,
    role: user.role,
    userAvatar: user.userAvatar,
    createdAt: user.createdAt,
    adress: user.adress,
    gender: user.gender,
  };
  res.status(200).json(result);
};

const getUserList = async (req, res) => {
  if (req.query.page) {
    const allUserList = await User.find({});
    const page = Number(req.query.page);
    let size = 10;
    const limit = parseInt(size);
    const skip = (page - 1) * size;

    const userList = await User.find({}).skip(skip).limit(limit);
    const UserList = userList.map((user) => {
      return {
        _id: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        role: user.role,
        userAvatar: user.userAvatar,
        createdAt: user.createdAt,
      };
    });

    return res
      .status(200)
      .json({
        pageSize: size,
        page: page,
        total: Math.ceil(allUserList.length / size),
        users: UserList,
      });
  }

  if (req.query.project) {
    const asignedToProject = await Project.find({ _id: req.query.project });
    //get ID of users asigned to the project
    const contributorsList = asignedToProject
      .map((ob) => ob.contributors)
      .flat();

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
        email: user.email,
        role: user.role,
      };
    });

    return res.status(200).json(result);
  }

  if (req.query.settings) {
    return res.status(200).json({
      _id: req.user._id,
      name: req.user.name,
      surname: req.user.surname,
      email: req.user.email,
      role: req.user.role,
      userAvatar: req.user.userAvatar,
      phone: req.user.phone,
      birthDay: req.user.birthDay,
      createdAt: req.user.createdAt,
      adress: req.user.adress,
      gender: req.user.gender,
    });
  }
};

const updateUserData = async (req, res) => {
  let { id, role, name, surname, email, adress, phone } = req.body;

  const { _id } = req.user;

  if (!id) {
    id = _id.toString();
  }

  const updateUserRole = await User.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        role: role,
        name: name,
        surname: surname,
        email: email,
        adress: adress,
        phone: phone,
      },
    }
  );

  res.status(200).json();
};

module.exports = {
  signupUser,
  loginUser,
  getUserData,
  getUserList,
  updateUserData,
};
