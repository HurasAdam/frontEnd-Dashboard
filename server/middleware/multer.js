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
  const allowedMimeTypes = ["jpeg","jpg","png","pdf","doc","docx","xls","octet-stream"];

  console.log(file)
  if (allowedMimeTypes.includes(file.mimetype.split("/")[1]))  {
    cb(null, true);
  } else {
    cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE",file.fieldname), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 100000000, },
  dest: null,
  unique_filename: true,
});



module.exports = {upload };
