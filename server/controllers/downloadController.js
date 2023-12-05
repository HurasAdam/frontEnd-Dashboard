const Axios = require("axios");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const Post = require("../db/models/post");
const cloudinaryConfig = require("../utils/cloudinary");
const os = require('os');
const path= require('path')

const downloadSelectedFile = async (req, res) => {
  const { public_Id } = req.query;

  const currentPost = await Post.findOne({ "files._id": public_Id });

  const currentPostAttachedFiles = currentPost.files;

  const selectedFile = currentPostAttachedFiles.filter(
    (file) => file._id.toString() === public_Id
  );

  const mime_type = selectedFile[0].file_type;
  const pulbic_id = selectedFile[0].publicId;

  try {
    if (mime_type === "raw") {
      const response = cloudinary.utils.download_zip_url({
        public_ids: [`${pulbic_id}`],
        resource_type: "raw",
      });
      console.log("RAR LUB ZIP");
      return res.status(200).json(response);
    } else {
      const { url, format } = await cloudinary.api.resource(pulbic_id);

      const response = await Axios({
        url,
        method: "GET",
        responseType: "stream",
      });
  
      const readableStream=response.data
      const defaultPath = path.join(os.homedir(), 'Downloads')
      const filePath = (`${defaultPath}/resource-${Math.random()}.${format}`);
      const writer = fs.createWriteStream(filePath);





      readableStream.pipe(writer);
      readableStream.on('end',()=>{
        writer.end()
        console.log("Stream has been closed")
        return res.status(200).json("Download succed")
      })
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  downloadSelectedFile,
};
