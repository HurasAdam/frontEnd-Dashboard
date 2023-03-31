const express = require("express");
const {cloudinary}=require('../utils/cloudinary')

const {
  loginUser,
  signupUser,
  getUserList,
 
  updateUserData,
  getUserData
 
} = require("../controllers/userController");
const {uploadAvatar,upload}=require("../middleware/multer")
const [requireAuth, authRole] = require("../middleware/requireAuth");

const router = express.Router();

// login route
router.post("/login", loginUser);

// signup route
router.post("/signup", signupUser);



router.get("/", requireAuth, getUserList);

router.get('/:id',requireAuth,getUserData)
//filter list


router.patch("/", requireAuth, authRole("admin",'user'), updateUserData);


router.patch('/upload',requireAuth,upload.single('file'),uploadAvatar)
// router.post('/upload', upload.single("file"),uploadAvatar)
module.exports = router;
