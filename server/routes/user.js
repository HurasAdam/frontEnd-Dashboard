const express = require('express')

// controller functions
const { loginUser, signupUser,getUserList,getAvalibleUserList,updateUserData } = require('../controllers/userController')
const [requireAuth,authRole]=require("../middleware/requireAuth")

const router = express.Router()

// login route
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)

module.exports = router

router.get('/',requireAuth,getUserList)

//filter list 
router.get('/avalibleContributors',requireAuth,getAvalibleUserList)


router.put('/',requireAuth,authRole('admin'),updateUserData)