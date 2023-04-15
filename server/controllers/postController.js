const Post = require("../db/models/post")
const createPost= async(req,res)=>{

   const{TicketId,CreatedBy,Content,createdAt}= req.body
   const user= req.user
   console.log(req.user)
const newPost = await Post.create({
    TicketId,
    CreatedBy:{
        id:user._id,
        name:user.name,
        surname:user.surname,
        role:user.role,
        email:user.email,
        userAvatar:user.userAvatar
    
    },
    Content,
    createdAt
})

    res.status(200).json(newPost)
}

const getAllPosts= async(req,res)=>{

    const postList = await Post.find({})
    console.log(postList)
    res.status(200).json(postList)

}


module.exports=[createPost,getAllPosts]