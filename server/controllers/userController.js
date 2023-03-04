const User = require("../db/models/user")
const mongoose= require('mongoose')
// login a user
const loginUser = async (req, res) => {

    const {email,password}=req.body
    
    try{
        if(!email||!password){
            throw Error('All fielnds needs to be filled')
        }
        const user= await User.findOne({email})
        if(!user){
            throw Error('Inncorect Email')
        }

        if(password!==user.password){
            throw Error('Inncorect Password')
        }
        else{
            res.status(200).json(user)
        }
       
    }
    catch(Error){
        console.log(Error)
        res.status(400).json(Error)
    }
 
}

// signup a user
const signupUser = async (req, res) => {
const {email,password}=req.body

try{

if(!email||!password){
    throw Error('All fields have to be filled')
}

    const exists = await User.findOne({email})
  if(exists){
    throw Error('Email already in use ')   
  }

  if(!exists){

    const user= await User.create({email,password})
res.status(200).json(user)
}


}
catch(Error){
    console.log(Error.message)
    res.status(400).json(Error.message)
}

}

module.exports = { signupUser, loginUser }
