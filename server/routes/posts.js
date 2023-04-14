const express = require("express");
const router = express.Router()


const [getAllPosts]=require("../controllers/postController")

router.post('/',getAllPosts)


module.exports=router