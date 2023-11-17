const Project = require("../db/models/project");
const User = require("../db/models/user");
const Note = require("../db/models/note");
const { ObjectId } = require("mongodb");
const { convertDate } = require("../utils/dateConvert");
const { default: mongoose } = require("mongoose");





//Create Projet
const createProject = async (req, res) => {
  const { title, description, contributors, } = req.body;

  try {
    if (!title || !description||!contributors) {
      throw Error("All fields have to be filled");
    }

    //Find contributors in DB
    const projectContributor = (await User.find({ _id: { $in: contributors } }).select("_id"))
    const projectLeader = await User.findOne({ email: req.user.email });
 const projectLeaderObjectId = mongoose.Types.ObjectId(projectLeader)
const projectContributorListId= projectContributor.map((contributor)=>contributor._id.toString())


    const project = await Project.create({
      title:title,
      description,
      contributors: projectContributorListId,
      projectLeader:projectLeaderObjectId,
    });

    res.status(201).json(project);
  } catch (Error) {
    console.log(Error.message);
    res.status(400).json(Error.message);
  }

};

//Get All limitedArrayOfProjects
const getProjectList = async (req, res) => {
 
  const { id: userId } = req.user;
  const { role } = req.role;
  const {page,membership,pageSize}=req.query
  
  // const defaultPageSize = 10;
  let size = pageSize

console.log(size)



  if (page) {
  const pageNumber = Number(req.query.page);
 
  const limit = parseInt(size);
  const skip = (pageNumber - 1) * size;
  const allProjects = await Project.find({});

  const limitedProjectList = await Project.find({}).skip(skip).limit(limit).populate({
    path:'projectLeader',
    model:'User',
    select:'_id name surname email role gender userAvatar'
  })

return res.status(200).json({
  pageSize: size,
  total: Math.ceil(allProjects.length / size),
  page: Number(page),
  limitedArrayOfProjects:limitedProjectList,
});
}

if(!page){
  const allProjects = await Project.find({})

  return res.status(200).json(allProjects)
}

    if(membership){
      console.log(membership)
      const filteredProjectList = await Project.find({contributors:userId}).select("id title")
      return res.status(200).json(filteredProjectList)
    }

};

//Get Sinle Project

const getSingleProject = async (req, res) => {
  const { id } = req.params;

  const project = await Project.findOne({ _id: id });

const contributorList = await Project.findOne({ _id: id }).select("contributors")
const arrayOfContributors=contributorList.contributors
  const contributors = await User.find({ _id:{$in:arrayOfContributors}}).select('name surname email role gender userAvatar');
  const projectLeader = await User.findOne({ _id: project?.projectLeader })

const singleProject = {
  projectId:project._id,
  title:project.title,
  description:project.description,
contributors:contributors,
  projectLeader:{
    _id:projectLeader._id,
    name:projectLeader.name,
    surname:projectLeader.surname,
    email:projectLeader.email,
    role:projectLeader.role,
    gender:projectLeader.gender,
    userAvatar:projectLeader.userAvatar,
  },
createdAt:convertDate({date:project.createdAt,includeHrs:true})
}




  res.status(200).json(singleProject);
};

// ---------UPDATE PROJECT--------------//
const updateProject = async (req, res) => {
  const { id } = req.params;
  const { title, description, leader, contributors } = req.body;
  const io = req.app.get("socketio");
const changes = {}  

  if(title){
    changes.title=title
  }
  if(description)changes.description=description
  if(leader){
    const currentProjectLeader= await User.findOne({_id:leader})
    const currentProjectLeaderId= currentProjectLeader._id
    changes.projectLeader=currentProjectLeaderId
  }
  if(contributors){
    const contributorId = contributors.map((contributor)=>contributor.id)
    const projectContributors= await User.find( { _id : { $in : contributorId } } ).select("id")
    console.log(projectContributors)
  changes.contributors=projectContributors
  }

  const updateProject = await Project.findOneAndUpdate({_id:id},{$set:changes})
const eventStreamObject = {id:updateProject._id,status:"update"}

io.sockets.emit("CollectionUpdate",eventStreamObject)
  res.status(200).json({message:'Updated Sucessfull',success:true});
};



// --------DELETE PROJECT--------------//

const deleteProject = async (req, res) => {
  const { id } = req.params;
  const tickets = await Note.find({});

  const result = tickets.filter(
    (ticket) => ticket.project.toString() === id
  );


  console.log(result.length)
 try{
if(result.length>0){
return res.status(400).json({message:"Cannot delete the project with existing tickets. Please remove the tickets first, and then try again",success:false})
}
else{
  const currentProject = await Project.findOneAndDelete({ _id: id });
  res.status(200).json('DELETED SCUESSFULLY');
}

 }
 catch(error){
  res.status(409).json(error)
 }
};

module.exports = {
  createProject,
  getProjectList,
  getSingleProject,
  updateProject,
  deleteProject,
};
