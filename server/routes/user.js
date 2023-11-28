const express = require("express");
const {cloudinary}=require('../utils/cloudinary')

const {
  loginUser,
  signupUser,
  getUserList,
  updateUserRole,
  updateUserData,
  getUserData,
  getUserAccount,
  updateCredentials,
  updateUserEmail
 
} = require("../controllers/userController");
const {uploadAvatar,upload,removeAvatar}=require("../middleware/multer")
const [requireAuth, authRole] = require("../middleware/requireAuth");
const {validateInputData} = require("../middleware/validateInputData")
const router = express.Router();

// login route
router.post("/login", loginUser);

// signup route
router.post("/signup", signupUser);

router.get("/user-profile",requireAuth,getUserAccount)

router.get("/", requireAuth, getUserList);

router.get('/:id',requireAuth,getUserData)
//filter list


router.patch("/", requireAuth, authRole("admin",'user'),validateInputData, updateUserData);
router.patch("/update-credentials",requireAuth,updateCredentials)
router.patch("/update-email",requireAuth,updateUserEmail)
router.patch("/manageRole",updateUserRole)
router.patch('/upload',requireAuth,upload.single('file'),uploadAvatar)
router.delete('/remove-avatar',requireAuth,removeAvatar)
// router.post('/upload', upload.single("file"),uploadAvatar)
module.exports = router;
