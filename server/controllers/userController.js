const User = require("../db/models/user");
const Project = require("../db/models/project");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const { convertDate } = require("../utils/dateConvert");

const createAccessToken = (id) => {
  const token = jwt.sign({ id }, process.env.SECRET, { expiresIn: "24h" });
  return token;
};
const createRefreshToken = (id) => {
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
      const accessToken = createAccessToken(user._id);
      const refreshToken = createRefreshToken(user._id);
      res
        .status(200)
        .json({
          userId: user._id,
          email,
          accessToken,
          refreshToken,
          role: user.role,
          userAvatar: user.userAvatar,
        });
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
        role: role || "user",
        userAvatar: userAvatar || "",
        phone: phone || "",
        birthDay: birthDay || "",
        adress: adress || "",
        createdAt: convertDate(),
      });
      const accessToken = createAccessToken(user._id);
      const refreshToken= createRefreshToken(user._id);

      res.status(200).json({
        name,
        surname,
        email,
        accessToken,
        refreshToken,
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
    phone: user.phone,
    userAvatar: user.userAvatar,
    createdAt: user.createdAt,
    adress: user.adress,
    gender: user.gender,
  };
  res.status(200).json(result);
};

const getUserList = async (req, res) => {
const {role,project,contributor}=req.query

// -------------------------------CONTRIBUTORS--------------------------------------//
  //return list of users that are not asigned yet to the current project
  if (req.query.project&& req.query.contributor==="false") {
    const projectId = req.query.project;
    const project = await Project.find({ _id: projectId });
    console.log(project)
    //get ID of users asigned to the project
    const contributorsListId = project.map((ob) => ob.contributors).flat();
    //get full list of Users
    const userList = await User.find({});
    //filter and return users that are not asigned to current project
    const filteredUserList = userList.filter((user)=>!contributorsListId.some((contributor)=>user._id.equals(contributor)));
    const result = filteredUserList.map((user) => {
      return {
        id: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        role: user.role,
        gender: user.gender,
        userAvatar: user.userAvatar,
      };
    });
    return res.status(200).json(result);
  }

  if(role){
    const adminList = await User.find({role})
  const xd = adminList.map(({_id,name,surname,email,role,gender,userAvatar})=>{
    return {_id,name,surname,email,role,gender,userAvatar}
  })
    res.status(200).json(xd)
  }
  else{
    
  const allUserList = await User.find({});
  //return list of all users as select options for new project
    const result = allUserList.map((user) => {
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
    return res.status(200).json(result);
  
  }


};

const updateUserData = async (req, res) => {
  let { name, surname, adress, phone,email,password } = req.body;

  const user = req.user

 const doesEmailExist=  await User.find({email:email})

  const updatedFields= {};
  try{



if(name&&!validator.isAlpha(name)){
  throw Error('Name should only contain letters')
}
if( surname&&!validator.isAlpha(surname)){
  throw Error('Name should only contain letters')
}

if(email && !validator.isEmail(email)){
  throw Error('Invalid email format ')
}
if(email && doesEmailExist.length>0){
  throw Error('Email already in use ')
}
if(name&&!validator.isLength(name,{max:20})){
  throw Error('Name is to long')
}
if(surname&&!validator.isLength(surname,{max:20})){
  throw Error('Surname is to long')
}
if(password&& !validator.isStrongPassword(password)){
  throw Error('Password is not strong enough')
}

const salt = await bcrypt.genSalt(10);




  if(name&&name!==user.name) updatedFields.name=name;
  if(surname&&surname!==user.surname) updatedFields.surname=surname;
  if(phone&&phone!==user.phone) updatedFields.phone=phone;
  if(adress&&adress!==user.adress) updatedFields.adress=adress;
  if(email&&email!==user.email) updatedFields.email=email;
  if(password){
    const hashNewPassword = await bcrypt.hash(password, salt);
    updatedFields.password= hashNewPassword;
  }

  
  const updateUserData= await User.findOneAndUpdate({_id:req.user._id},{
    $set:updatedFields},
    {new:true}
  )
return res.status(200).json({data:updateUserData,message:'updated successfully'})
}
catch(Error){
return res.status(400).json(Error.message)
}

};








const updateUserRole = async (req, res) => {
  const { selectedUser, role } = req.body;
  const user = await User.findOneAndUpdate(
    { _id: selectedUser },
    { $set: { role: role } }
  );

  res.status(200);
};


const getUserAccount= async(req,res)=>{

const {_id:userId}=req.user

const userProfile = await User.find({_id:userId}).select('name surname userAvatar phone birthDay gender role')

console.log(userProfile[0])

const projectListAsignedTo = await Project.find({
  contributors:{$in:[userId]}
}).populate({
  path:'contributors',
  model:'User',
  select:'name surname userAvatar '

})

console.log(userId)
   res.status(200).json({userProfile:userProfile[0],projectListAsignedTo})

}

module.exports = {
  signupUser,
  loginUser,
  getUserData,
  getUserList,
  updateUserData,
  updateUserRole,
  getUserAccount
};


