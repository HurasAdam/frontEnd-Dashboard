const express = require("express");
const router = express.Router();
const https = require("https");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const [requireAuth, authRole] = require("../middleware/requireAuth");
const cloudinaryConfig = require("../utils/cloudinary");
const { error } = require("console");

router.get("/", async (req, res) => {
  const { public_Id } = req.query;

try{
        const response = await cloudinary.api.resource(public_Id);

        const options = {
          resource_type: "raw",
        };
        const stream_url = cloudinary.utils.download_zip_url(public_Id, options);
        const fileStream = fs.createWriteStream(
          `${response.asset_id}-copy.${response.format}`
        );
      
       
      
        const reqest = https.get(stream_url, (response) => {
          response.pipe(fileStream);
        });

        reqest.on('error',(err)=>{
                console.error('Download Error:',err)
        })

fileStream.on('finish',()=>{
        console.log('Download file succesfully')
})
}
catch(error){
        console.log(error)
}

});

module.exports = router;
