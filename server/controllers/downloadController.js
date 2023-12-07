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
      return res.status(200).json({meessage:"Download succed",success:true,id:public_Id,url:response});
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
        return res.status(200).json({message:"Downloading succed",success:true,id:public_Id})
      })
    }
  } catch (error) {
    console.log(error);
  }
};



const deleteSelectedFile=async(req,res)=>{

const {id}= req.params


const selectedFile = await Post.findOne({ "files._id": id},{"files.$":1})

if(!selectedFile){
  return res.status(404).json({message:"File not found",success:false})
}

const [fileObject]= selectedFile.files.map((file)=>{
  return({publicId:file.publicId,file_type:file.file_type})

})

const {publicId,file_type}=fileObject
const {result}= await cloudinary.uploader.destroy(publicId,{resource_type:'image'});


if(result!=='ok'){
return res.status(404).json({message:"File not found",success:false})
}

const dbResponse = await Post.updateOne(
  { "files._id": id },
  { $pull: { files: { _id: id } } }
);


if(dbResponse.modifiedCount===0){
return res.status(404).json({message:"File not found",success:false})
}

if(dbResponse.modifiedCount>0){
  res.status(200).json({message:"File deleted successfully",success:true})
}

}


module.exports = {
  downloadSelectedFile,
  deleteSelectedFile
};
