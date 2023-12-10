const User = require("../db/models/user");
const cloudinary = require("cloudinary").v2;
const Project = require("../db/models/project");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const { convertDate } = require("../utils/dateConvert");
const { validateForm } = require("../utils/validateForm");
const {checkForUpdates } = require("../utils/checkForUpdates");
const { validateData } = require("../utils/validateData");

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
      res.status(200).json({
        userId: user._id,
        name:user.name,
        surname:user.surname,
        email,
        accessToken,
        refreshToken,
        role: user.role,
        userAvatar: user.userAvatar.url,
      });
    }
  } catch (Error) {
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

        birthDay: birthDay || "",

        createdAt: new Date(),
      });
      const accessToken = createAccessToken(user._id);
      const refreshToken = createRefreshToken(user._id);

      res.status(200).json({
        name,
        surname,
        email,
        accessToken,
        refreshToken,
        role,
        userAvatar,
        
        
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
    userAvatar: user.userAvatar.url,
    createdAt: user.createdAt,
    country: user.country,
    city: user.city,
    gender: user.gender,
  };
  res.status(200).json(result);
};

const getUserList = async (req, res) => {
  const { role, project, contributor } = req.query;

  // -------------------------------CONTRIBUTORS--------------------------------------//
  //return list of users that are not asigned yet to the current project
  if (req.query.project && req.query.contributor === "false") {
    const projectId = req.query.project;
    const project = await Project.find({ _id: projectId });

    //get ID of users asigned to the project
    const contributorsListId = project.map((ob) => ob.contributors).flat();
    //get full list of Users
    const userList = await User.find({});
    //filter and return users that are not asigned to current project
    const filteredUserList = userList.filter(
      (user) =>
        !contributorsListId.some((contributor) => user._id.equals(contributor))
    );
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

  if (role) {
    const adminList = await User.find({ role });
    const xd = adminList.map(
      ({ _id, name, surname, email, role, gender, userAvatar }) => {
        return { _id, name, surname, email, role, gender, userAvatar };
      }
    );
    res.status(200).json(xd);
  } else {
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
  console.log("UPDATE ENDPOINT WORKING")

 
const userData= req.user
const inputData = req.body
const updates = checkForUpdates(req.body,req.user)

if(!updates){
  return res.status(400).json({message:"No updates", succes:false})
}
else{
  const updateUserData = await User.findOneAndUpdate(
    { _id: req.user._id },
    { $set: updates },
    { new: true }
  );

  console.log(updateUserData)

  return res
    .status(200)
    .json({ message: "data hase been changed sucessfull", success: true,});
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

const getUserAccount = async (req, res) => {
  const { _id: userId } = req.user;

  const userProfile = await User.find({ _id: userId }).select(
    "name surname userAvatar phone birthDay gender country city role email"
  );

  const projectListAsignedTo = await Project.find({
    contributors: { $in: [userId] },
  }).populate({
    path: "contributors",
    model: "User",
    select: "name surname userAvatar",
  });

  res.status(200).json({ userProfile: userProfile[0], projectListAsignedTo });
};

const updateUserPassword = async (req, res) => {
  const { password, newPassword,confirmNewPassword } = req.body;
  const { password: currentPassword, _id: userId } = req.user;
  const doesExist = validateData({ password, newPassword,confirmNewPassword });

  if (doesExist) {
    return res.status(400).json(doesExist);
  }

  if(newPassword!==confirmNewPassword){
    return res.status(400).json({message:["new password and confirmed new password are different"],succes:false})
  }


  const isOldPasswordValid = await bcrypt.compare(password, currentPassword);
  if (!isOldPasswordValid) {
    return res
      .status(400)
      .json({ message: ["Inncorrenct Password"], succes: false });
  }

  const isPasswordChanged = !await bcrypt.compare(newPassword, currentPassword);

  if(!isPasswordChanged){
    return res.status(400).json({message:["new password must be diffrenect than current password"],success:false})
  }


 else {
    if (!validator.isStrongPassword(newPassword)) {
      return res
        .status(400)
        .json({ message: ["New password not strong enough"], success: false });
    } else {
      const newHashedPassword = await bcrypt.hash(newPassword, 10);
      await User.findOneAndUpdate(
        { _id: userId },
        {
          $set: { password: newHashedPassword },
        }
      );
      res.status(200).json({message:["Password has been changed"],success:true});
    }
  }
};

const updateUserEmail = async (req, res) => {
  const { newEmail, confirmNewEmail, password } = req.body;
  const { _id: userId, email, password: userPassword } = req.user;


  const isPasswordValid = await bcrypt.compare(password, userPassword);

 
  if (newEmail !== confirmNewEmail) {
    return res
      .status(400)
      .json({
        message: ["new email and confirm new email are different"],
        success: false,
      });
  }
  if (!isPasswordValid) {
    return res
      .status(400)
      .json({ message: ["Inncorect password"], success: false });
  }



  const doesEmailExist = await User.find({ email: newEmail }).select("email");

  if (doesEmailExist.length > 0) {
    return res
      .status(400)
      .json({ message: ["Email already taken"], success: false });
  }


    await User.findOneAndUpdate(
      { _id: userId },
      {
        $set: { email: newEmail },
      }
    );
    res.status(200).json({ message: ["Email has been changed"], success: true });
  

};





const uploadAvatar = async (req, res) => {

  console.log(req.file)
  const {_id:userId}=req.user
const {userAvatar} = await User.findOne({_id:userId})

if(userAvatar.publicId){
  await cloudinary.uploader.destroy(userAvatar.publicId);
}


  try {
    const up = await cloudinary.uploader.upload(req.file.path, {
      folder: "userAvatars",
      resource_type: "auto",
    });

  

    const updateUserAvatar = await User.findOneAndUpdate(
      { _id: userId },
      { $set: { "userAvatar.url": up.secure_url,"userAvatar.publicId": up.public_id  } }
    );

    res
      .status(200)
      .json({ data: up.secure_url, message: "Updated sucessfully" });
  } catch (err) {
    res.json({ message: err });
  }
};


const removeAvatar = async(req,res)=>{
  const {_id:userId}=req.user
  const {userAvatar} = await User.findOne({_id:userId})
  
  if(userAvatar.publicId){
    const response= await cloudinary.uploader.destroy(userAvatar.publicId);
    if(response.result==='ok'){
    const updateUserAvatar = await User.findOneAndUpdate(
      { _id: userId },
      { $set: { "userAvatar.url": "","userAvatar.publicId":"" } },
      { new: true }
    );

    res.status(200).json({data:updateUserAvatar.userAvatar.url,message:"Avatar has been removed"})
    }
  }

}






module.exports = {
  signupUser,
  loginUser,
  getUserData,
  getUserList,
  updateUserData,
  updateUserRole,
  getUserAccount,
  updateUserPassword,
  updateUserEmail,
  uploadAvatar,
  removeAvatar
};
