const Post = require("../db/models/post")
const User= require("../db/models/user")
const Note = require("../db/models/note")
const createPost= async(req,res)=>{
    const{newComment}= req.body
    const {ticketId}=req.query
    const user= req.user
    const currentTicket = await Note.findOne({_id:ticketId})
    

  
const newPost = await Post.create({
    ticketId:currentTicket._id.toString(),
    CreatedBy:user._id.toString(),
    Content:newComment
    
})

    res.status(200).json(newPost)
}

const getAllPosts= async(req,res)=>{

    const postList = await Post.find({})
    console.log(postList)
    res.status(200).json(postList)

}


module.exports=[createPost,getAllPosts]