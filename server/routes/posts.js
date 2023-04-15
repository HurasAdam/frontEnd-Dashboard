const express = require("express");
const router = express.Router()


const [createPost,getAllPosts]=require("../controllers/postController")
const [requireAuth]=require("../middleware/requireAuth")
router.post('/',requireAuth,createPost)
router.get('/',requireAuth,getAllPosts)

module.exports=router