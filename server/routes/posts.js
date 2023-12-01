const express = require("express");
const router = express.Router()
const {clodinary}= require("../utils/cloudinary")

const [createPost,getAllPosts,updatePost,deletePost]=require("../controllers/postController")
const {upload}= require("../middleware/multer")
const [requireAuth]=require("../middleware/requireAuth")
router.post('/',requireAuth,upload.array('file',3),createPost)
router.get('/',requireAuth,getAllPosts)
router.patch('/:id',requireAuth,updatePost)
router.delete('/:id',requireAuth,deletePost)

module.exports=router