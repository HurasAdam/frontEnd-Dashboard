const Axios = require("axios");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const Post = require("../db/models/post");
const cloudinaryConfig = require("../utils/cloudinary");
const { error } = require("console");

const downloadSelectedFile= async (req, res) => {
    const { public_Id } = req.query;
  
    const selectedFile = await Post.findOne({ "files._id": public_Id });
  
    const mime_type = selectedFile.files[0].file_type;
    const pulbic_id = selectedFile.files[0].publicId;
  
    try {
      if (mime_type === "raw") {
        const response = cloudinary.utils.download_zip_url({
          public_ids: [`${pulbic_id}`],
          resource_type: "raw",
        });
  
        return res.status(200).json(response);
      } else {
        const { url, format } = await cloudinary.api.resource(pulbic_id);
  
        const response = await Axios({
          url,
          method: "GET",
          responseType: "stream",
        });
  
        const path = `resource.${format}`;
        const writer = fs.createWriteStream(path);
  
        response.data.pipe(writer);
      }
    } catch (error) {
      console.log(error);
    }
}

  module.exports = {
    downloadSelectedFile
  };