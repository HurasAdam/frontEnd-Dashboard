const express = require("express");
const {cloudinary}=require('../utils/cloudinary')

const {
  loginUser,
  signupUser,
  getUserList,
  getAvalibleUserList,
  updateUserData,
 
} = require("../controllers/userController");
const {uploadAvatar,upload}=require("../middleware/multer")
const [requireAuth, authRole] = require("../middleware/requireAuth");

const router = express.Router();

// login route
router.post("/login", loginUser);

// signup route
router.post("/signup", signupUser);



router.get("/", requireAuth, getUserList);

//filter list
router.get("/avalibleContributors", requireAuth, getAvalibleUserList);

router.patch("/", requireAuth, authRole("admin"), updateUserData);


router.patch('/upload',requireAuth,upload.single('file'),uploadAvatar)
// router.post('/upload', upload.single("file"),uploadAvatar)
module.exports = router;
