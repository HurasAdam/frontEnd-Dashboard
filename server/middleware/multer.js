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
  try {
    const up = await cloudinary.uploader.upload(req.file.path, {
      folder: "userAvatars",
      resource_type: "auto",
    });

    const { _id: userId } = req.user;

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

module.exports = { uploadAvatar, upload };
