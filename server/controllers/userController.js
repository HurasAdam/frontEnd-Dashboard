const User = require("../db/models/user")
const mongoose= require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");
const validator=require("validator")

const createToken= (id)=>{

const token =  jwt.sign({id},process.env.SECRET,{expiresIn:"1h"});
return token

}

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
const matchPassword= await bcrypt.compare(password,user.password)
        if(!matchPassword){
            throw Error('Inncorect Password')
        }
        else{
            const token=createToken(user._id)
            res.status(200).json({email,token})
        }
       
    }
    catch(Error){
        console.log(Error)
        res.status(400).json(Error.message)
    }
 
}

// signup a user
const signupUser = async (req, res) => {
const {email,password,role}=req.body

try{

if(!email||!password||!role){
    throw Error('All fields have to be filled')
}

if(!validator.isEmail(email)){
    throw Error('Email is not valid')
}

if(!validator.isStrongPassword(password)){
    throw Error('Password not strong enough')
}



    const exists = await User.findOne({email})
  if(exists){
    throw Error('Email already in use ')   
  }

  if(!exists){

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password,salt);
 
    const user= await User.create({email,password:hashPassword,role})
    const token = createToken(user._id)
console.log(token)
res.status(200).json({email,token,role})
}


}
catch(Error){
    console.log(Error)
    res.status(400).json(Error.message)
}

}





const getUserList=async(req,res)=>{

const userList= await User.find({}).select('email')


res.status(200).json(userList)

}


module.exports = { signupUser, loginUser,getUserList }
