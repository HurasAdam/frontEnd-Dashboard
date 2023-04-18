const Post = require("../db/models/post")
const User= require("../db/models/user")
const Note = require("../db/models/note")
const Project = require("../db/models/project")

const createPost= async(req,res)=>{
    const{newComment}= req.body
    const {ticketId}=req.query
    const user= req.user
 
    const currentTicket = await Note.findOne({_id:ticketId})
   const currProjectId = currentTicket.project
   const currentProject= await Project.findOne({_id:currProjectId})
   const currentProjectContributorsList= currentProject.contributors
   const isContributor = currentProjectContributorsList.includes(user._id.toString())


   if(isContributor||user.role==='admin'){

const newPost = await Post.create({
    ticketId:currentTicket._id.toString(),
    CreatedBy:user._id.toString(),
    Content:newComment
    
})

    return res.status(200).json(newPost)
}
else{
    return res.status(400).json("Forrbiden access")
}
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