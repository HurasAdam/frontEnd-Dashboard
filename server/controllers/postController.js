const Post = require("../db/models/post")
const getAllPosts= async(req,res)=>{

   const{TicketId,CreatedBy,Content,createdAt}= req.body
const newPost = await Post.create({
    TicketId,
    CreatedBy,
    Content,
    createdAt
})

    res.status(200).json(newPost)
}


module.exports=[getAllPosts]