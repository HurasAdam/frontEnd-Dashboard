const express = require("express");
const router = express.Router()


const [createPost,getAllPosts,updatePost]=require("../controllers/postController")
const [requireAuth]=require("../middleware/requireAuth")
router.post('/',requireAuth,createPost)
router.get('/',requireAuth,getAllPosts)
router.patch('/:id',requireAuth,updatePost)

module.exports=router