const multer = require("multer")
const uuid = require('uuid').v4
const User=require('../db/models/user')
const cloudinary = require('cloudinary')
const mongoose = require("mongoose");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads");
    },
    filename: (req, file, cb) => {
      const { originalname } = file;
      cb(null, `${uuid()}-${originalname}`);
    },
  });

  const fileFilter= (req,file,cb)=>{
    if(file.mimetype.split('/')[0]==='image'){
        cb(null,true)
    }
    else{
        cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"),false)
    }
  };

  const upload= multer({
    storage,
    fileFilter,
    limits:{fileSize:100000000,files:1},
  })


  const uploadAvatar= async (req, res) => {
    try {
    

        const {_id}=req.user

    const userId= _id.toString()
      const up = await cloudinary.uploader.upload(req.file.path, {
        folder: "userAvatars"
      });
      
      console.log(userId)
      
      
     
     
    
    const updateUserAvatar= await User.findOneAndUpdate( { _id:userId} , { $set: { userAvatar : up.secure_url}})

    res.status(200).json()
    } catch (err) {
      res.json({ message: err });
    }
  };
  



  module.exports={uploadAvatar,upload}