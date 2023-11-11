const Post = require("../db/models/post");
const User = require("../db/models/user");
const Note = require("../db/models/note");
const Project = require("../db/models/project");

//Add Post
const createPost = async (req, res) => {
  const { content } = req.body;

  const { ticketId } = req.query;
console.log(content)
  const user = req.user;

  const currentTicket = await Note.findOne({ _id: ticketId });
  const currProjectId = currentTicket.project;
  const currentProject = await Project.findOne({ _id: currProjectId });
  const currentProjectContributorsList = currentProject.contributors;
  const isContributor = currentProjectContributorsList.includes(
    user._id.toString()
  );
//check if usesr role is admin or is he a member of project
  if (isContributor || user.role === "admin") {
    const newPost = await Post.create({
      content,
      ticketId: currentTicket._id.toString(),
      CreatedBy: user._id.toString(),
      
    });
    return res.status(200).json("Post has been added successfully");
  } else {
    return res.status(400).json("Forrbiden access");
  }
};

//Get PostList
const getAllPosts = async (req, res) => {
  const { ticketId } = req.query;
  const postList = await Post.find({ ticketId: ticketId });
  const postAuthorList = await Promise.all(
    postList.map((p) => User.findOne({ _id: p.CreatedBy }))
  );
console.log(ticketId)
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
    const {id} = req.params
const {editedComment}=req.body
console.log(editedComment)
try{
    if(!editedComment){
throw Error('empty comment')
    }
    const userComment= await Post.findOneAndUpdate({_id:id},{$set:{Content:editedComment}})
   

res.status(200).json({data:null,message:"updated sucessfully"})
}

catch(error){
    console.log(error)
    res.status(204)
}
}


module.exports = [createPost, getAllPosts,updatePost];
