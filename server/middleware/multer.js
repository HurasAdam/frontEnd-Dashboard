const multer = require("multer")
const uuid = require('uuid').v4
const User=require('../db/models/user')
const cloudinary = require('cloudinary')
const mongoose = require("mongoose");

const storage = multer.diskStorage({

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
    

   
      const up = await cloudinary.uploader.upload(req.file.path, {
        folder: "userAvatars",
        resource_type:"auto"
      });
      
    const userId = req.query.id
    const updateUserAvatar= await User.findOneAndUpdate( { _id:userId} , { $set: { userAvatar : up.secure_url}})
console.log(up)
  
    res.status(200).json({data:up.secure_url,message:"Updated sucessfully" })
    } catch (err) {
      res.json({ message: err });
    }
  };
  



  module.exports={uploadAvatar,upload}