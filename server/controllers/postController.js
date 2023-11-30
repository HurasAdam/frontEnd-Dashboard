const Post = require("../db/models/post");
const User = require("../db/models/user");
const Note = require("../db/models/note");
const Project = require("../db/models/project");
const cloudinary = require("cloudinary").v2;
//Add Post
const createPost = async (req, res) => {
  const post = req.body;
  const {content}=post
  const {textContent}=content
  const io = req.app.get("socketio");
  const { ticketId } = req.query;

console.log(req.file)


  const user = req.user;

  const currentTicket = await Note.findOne({ _id: ticketId });
  const currProjectId = currentTicket.project;
  const currentProject = await Project.findOne({ _id: currProjectId });
  const currentProjectContributorsList = currentProject.contributors;
  const isContributor = currentProjectContributorsList.includes(
    user._id.toString()
  );

  if(!post){
   return res.status(400).json({message:"Post content cannot be empty. Please provide valid content for the post.",success:false})
  }

try{
//check if usesr role is admin or is he a member of project
  if (isContributor || user.role === "admin") {



    // const upload = await cloudinary.uploader.upload(req.file.path, {
    //   folder: "postUploads",
    //   resource_type: "auto",
    // });
  



    const newPost = await Post.create({
      content:textContent,
      ticketId: currentTicket._id.toString(),
      CreatedBy: user._id.toString(),

    });







    const eventStreamObject = {id:ticketId._id,status:"update"}
    io.sockets.emit("postCollectionUpdate",eventStreamObject)
    return res.status(200).json({message:"Post has been added successfully",success:true});
  } else {
    return res.status(400).json("Forrbiden access");
  }
}
catch(error){

  return res.status(400).json(error.message)
}
};

//Get PostList
const getAllPosts = async (req, res) => {
  const { ticketId } = req.query;
  const postList = await Post.find({ ticketId: ticketId });
  const postAuthorList = await Promise.all(
    postList.map((p) => User.findOne({ _id: p.CreatedBy }))
  );

  const result = postList.map((post) => {
    const postAuthor = postAuthorList.find(
      (author) => author._id.toString() === post.CreatedBy
    );

    post["CreatedBy"] = {
      id: postAuthor._id,
      name: postAuthor.name,
      surname: postAuthor.surname,
      email: postAuthor.email,
      role: postAuthor.role,
      userAvatar: postAuthor.userAvatar,
    };
    return post;
  });
  res.status(200).json(postList);
};





const updatePost=async(req,res)=>{
  const io = req.app.get("socketio");
const {id}=req.params
const {_id}=req.user
const {content}=req.body

console.log(content)
const post = await Post.findOne({_id:id})
const postOwnerId= post.CreatedBy.toString()
const userId = _id.toString()

try{

  if(postOwnerId!==userId){
    return res.status(403).json({message:"You don't have permission to edit this post.",success:false})
    }
    
    if(!content){
      return res.status(400).json({message:"Content cannot be empty. Please provide valid content for the comment edit.",success:false})
    }
    
    else{
      const update= await Post.findOneAndUpdate({_id:id},{$set:{content:content}})
      const eventStreamObject = {id:id,status:"update"}
      io.sockets.emit("postCollectionUpdate",eventStreamObject)

     return res.status(200).json({message:"Post has been updated successfully",success:true})
    }
    
}
catch(error){
  res.status(403).json(error.message)
}

}

 const deletePost= async (req,res)=>{
  const io = req.app.get("socketio");
const {id}=req.params
const {_id:userId}=req.user;
const userIdString = userId.toString()
const post = await Post.findOne({_id:id})
const postAuthorId = post.CreatedBy

if(userIdString===postAuthorId){
 const deletePost = await Post.findOneAndDelete({_id:id})
 const eventStreamObject = {id:id,status:"update"}
 io.sockets.emit("postCollectionUpdate",eventStreamObject)
 res.status(200).json("Post has been deleted successfully")
}
}



module.exports = [createPost, getAllPosts,updatePost,deletePost];
