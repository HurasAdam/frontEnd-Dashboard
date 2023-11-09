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

p = {
_id:project._id,
title:project.title,
description:project.description,
contributor:project.contributors,
projectLeader:projectLeader,
createdAt:convertDate({date:project.createdAt})
}


return p
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
  const projectLeader = await User.findOne({ _id: project.projectLeader });
const contributorsList = contributors.map((contributor)=>{
  return {
    _id:contributor._id,
    name:contributor.name,
    surname:contributor.surname,
    email:contributor.email,
    role:contributor.role,
    gender:contributor.gender,
    userAvatar:contributor.userAvatar
  
  }
})

const singleProject = {
  projectId:project.id,
  title:project.title,
  description:project.description,
contributors:contributorsList,
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
    const contributorId = contributors.map((contributor)=>contributor._id)
    const projectContributors= await User.find( { _id : { $in : contributorId } } ).select("_id")
    console.log(projectContributors)
  changes.contributors=projectContributors
  }

  const updateProject = await Project.findOneAndUpdate({_id:id},{$set:changes})
const eventStreamObject = {id:updateProject._id,status:"update"}

io.sockets.emit("CollectionUpdate",eventStreamObject)
  res.status(200).json('Updated Sucessfull');
};



// --------DELETE PROJECT--------------//

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
