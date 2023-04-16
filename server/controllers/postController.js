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
const {ticketId}=req.query

    const postList = await Post.find({ticketId:ticketId})


    const postAuthorList = await Promise.all((postList.map((p)=> User.findOne({_id:p.CreatedBy})))) 
   
    const result = postList.map((post)=>{
        const postAuthor = postAuthorList.find((author)=>author._id.toString()===post.CreatedBy)
      
        post["CreatedBy"]={
            id:postAuthor._id,
            name:postAuthor.name,
            surname:postAuthor.surname,
            email:postAuthor.email,
            role:postAuthor.role,
            userAvatar:postAuthor.userAvatar        
        }
        
        return post
       })


    res.status(200).json(postList)

}


module.exports=[createPost,getAllPosts]