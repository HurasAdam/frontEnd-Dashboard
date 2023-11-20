const multer = require("multer");
const uuid = require("uuid").v4;
const User = require("../db/models/user");
const cloudinary = require("cloudinary").v2;
const mongoose = require("mongoose");



const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    const { originalname } = file;
    cb(null, `${uuid()}-${originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.split("/")[0] === "image") {
    cb(null, true);
  } else {
    cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 100000000, files: 1 },
  dest: null,
  unique_filename: true,
});




const uploadAvatar = async (req, res) => {
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
    await cloudinary.uploader.destroy(userAvatar.publicId);
    const updateUserAvatar = await User.findOneAndUpdate(
      { _id: userId },
      { $set: { "userAvatar.url": "","userAvatar.publicId":"" } },
      { new: true }
    );


  }

 res.status(200).json("Photo has been removed")
}



module.exports = { uploadAvatar, removeAvatar,upload };
