const express = require('express')

// controller functions
const { loginUser, signupUser,getUserList,getAvalibleUserList } = require('../controllers/userController')

const router = express.Router()

// login route
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)

module.exports = router

router.get('/',getUserList)

//filter list 
router.get('/avalibleContributors',getAvalibleUserList)