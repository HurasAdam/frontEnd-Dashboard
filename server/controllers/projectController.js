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
    if (!title || !description) {
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
      createdAt: convertDate(),
    });

    res.status(201).json(project);
  } catch (Error) {
    console.log(Error.message);
    res.status(400).json(Error.message);
  }

};

//Get All limitedArrayOfProjects
const getProjectList = async (req, res) => {
  // const page = req.query.page||0

 
  const { id: userId } = req.user;
 
  const { role } = req.role;
  const page = Number(req.query.page);

  let size = 13;
  const limit = parseInt(size);
  const skip = (page - 1) * size;
  const allProjects = await Project.find({});
  const limitedArrayOfProjects = await Project.find({}).skip(skip).limit(limit);

const projectLeaderList = await Promise.all(limitedArrayOfProjects.map((p)=> User.findById(p.projectLeader)))



const updatedProjectList = limitedArrayOfProjects.map((project)=>{
  const projectLeader = projectLeaderList.find((person)=>person._id.toString()===project.projectLeader.toString())
project["projectLeader"]=projectLeader
return project
})
 
  const { limitedArrayOfProjects: queryString } = req.query;
  const userlimitedArrayOfProjects = allProjects.filter((project)=>project.contributors.includes(userId))
  if (!queryString && typeof page === "number") {
    res
      .status(200)
      .json({
        pageSize: size,
        total: Math.ceil(allProjects.length / size),
        page: page,
        limitedArrayOfProjects:updatedProjectList,
      });
  }
  //project list that user belongs to as select opions
  if (queryString === "userlimitedArrayOfProjects" && role === "admin") {
    res.status(200).json(allProjects);
  }
  //all project as select options - only for admin role
  else if (queryString === "userlimitedArrayOfProjects" && role !== "admin") {
    res.status(200).json(userlimitedArrayOfProjects);
  }
};

//Get Sinle Project

const getSingleProject = async (req, res) => {
  const { id } = req.params;

  const project = await Project.findOne({ _id: id });

  const contributors = await User.find({ _id: project.contributors });
  const projectLeader = await User.findOne({ _id: project.projectLeaderId });
const contributorsList = contributors.map((contributor)=>{
  return {
    contributorId:contributor._id.toString(),
    name:contributor.name,
    surname:contributor.surname,
    email:contributor.email,
    role:contributor.role,
    gender:contributor.gender,
    userAvatar:contributor.userAvatar
  
  }
})

const singleProject = {
  projectId:project._id,
  title:project.title,
  description:project.description,
contributors:contributorsList,
  projectLeader:{
    projectLeaderId:projectLeader._id.toString(),
    name:projectLeader.name,
    surname:projectLeader.surname,
    email:projectLeader.email,
    role:projectLeader.role,
    gender:projectLeader.gender,
    userAvatar:projectLeader.userAvatar,
  },
createdAt:project.createdAt
}




  res.status(200).json(singleProject);
};


const updateProject = async (req, res) => {
  const { id } = req.params;
  const { title, description, projectLeader, contributors } = req.body;
  const updates = req.body;

  const findProjectLeader= await User.findOne({_id:projectLeader})
  const getContributorsId = contributors.map((contributor)=>contributor.contributorId)
  const projectContributors= await User.find( { _id : { $in : getContributorsId } } ).select("_id")
const convertTypeContributorsId= projectContributors.map((contributor)=>contributor._id.toString())




  // const updateProject = await Project.findOneAndUpdate({_id:id},{$set:{
  //   title,
  //   description,
  //   projectLeaderId:findProjectLeader._id,
  //   contributors:convertTypeContributorsId
  // }},{
  //   runValidators:true,
  // })


  res.status(200).json("OKERAJO");
};

const deleteProject = async (req, res) => {
  const { id } = req.params;

  const tickets = await Note.find({});

  const result = tickets.filter(
    (ticket) => ticket.project === id
  );

 
 try{
if(result.length>0){
throw Error( 'NIE MOZNA USUNAC PROJEKTU. ISTNIEJA TICKETY W RAMACH PROJEKTU KTORY CHCESZ USUNAC')
}

    const currentProject = await Project.findOneAndDelete({ _id: id });
   res.status(200).json('DELETED SCUESSFULLY');
 }
 catch(error){
  res.status(409).json(error.message)
 }
};

module.exports = {
  createProject,
  getProjectList,
  getSingleProject,
  updateProject,
  deleteProject,
};
