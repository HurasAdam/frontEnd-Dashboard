const Project = require("../db/models/project");
const User = require("../db/models/user");
const Note = require("../db/models/note");
const { ObjectId } = require("mongodb");
const { convertDate } = require("../utils/dateConvert");
//Create Projet
const createProject = async (req, res) => {
  const { projectTitle, description, contributors, projectLeader } = req.body;
  try {
    if (!projectTitle || !description || !contributors) {
      throw Error("All fields have to be filled");
    }

    //Find contributors in DB
    const projectContributor = (await User.find({ _id: { $in: contributors } }).select("_id"))
    const projectManager = await User.findOne({ email: projectLeader });

const projectContributorListId= projectContributor.map((contributor)=>contributor._id.toString())


    const project = await Project.create({
      projectTitle,
      description,
     
      contributors: projectContributorListId,
      projectLeaderId:projectManager._id,
      createdAt: convertDate(),
    });

    res.status(201).json(project);
  } catch (Error) {
    console.log(Error.message);
    res.status(400).json(Error.message);
  }
};

//Get All Projects
const getProjectList = async (req, res) => {
  // const page = req.query.page||0
  const { id: userId } = req.user;
  const { role } = req.role;
  const page = Number(req.query.page);

  let size = 13;
  const limit = parseInt(size);
  const skip = (page - 1) * size;
  const allProjects = await Project.find({});
  const projects = await Project.find({}).skip(skip).limit(limit);
const projectLeaderList = await Promise.all((projects.map((p)=> User.findOne({_id:p.projectLeaderId})))) 

 const result = projects.map((proj)=>{
  const projectLeader = projectLeaderList.find((pl)=>pl._id.toString()===proj.projectLeaderId)
  proj["projectLeader"]=projectLeader
  return proj
 })

  const { projects: queryString } = req.query;
  const userProjects = allProjects.filter((project)=>project.contributors.includes(userId))
  if (!queryString && typeof page === "number") {
    res
      .status(200)
      .json({
        pageSize: size,
        total: Math.ceil(allProjects.length / size),
        page: page,
        projects: result,
      });
  }
  //project list that user belongs to as select opions
  if (queryString === "userProjects" && role === "admin") {
    res.status(200).json(allProjects);
  }
  //all project as select options - only for admin role
  else if (queryString === "userProjects" && role !== "admin") {
    res.status(200).json(userProjects);
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
  projectTitle:project.projectTitle,
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
  const { projectTitle, description, projectLeader, contributors } = req.body;
  const updates = req.body;
  
  const findProjectLeader= await User.findOne({_id:projectLeader})
  const getContributorsId = contributors.map((contributor)=>contributor.contributorId)
  const projectContributors= await User.find( { _id : { $in : getContributorsId } } ).select("_id")
const convertTypeContributorsId= projectContributors.map((contributor)=>contributor._id.toString())




  const updateProject = await Project.findOneAndUpdate({_id:id},{$set:{
    projectTitle:projectTitle,
    description:description,
    projectLeaderId:findProjectLeader._id,
    contributors:convertTypeContributorsId
  }})


  res.status(200).json(updateProject);
};

const deleteProject = async (req, res) => {
  const { id } = req.params;

  const tickets = await Note.find({});

  const result = tickets.filter(
    (ticket) => ticket.project._id.toString() === id
  );

  try {
    if (result.length > 0) {
      throw Error(
        "Can not delete project due to other references.Check ticket list"
      );
    }
    const currentProject = await Project.findOneAndDelete({ _id: id });
    res.status(200).json();
  } catch (Error) {
    res.status(409).json(Error.message);
  }
};

module.exports = {
  createProject,
  getProjectList,
  getSingleProject,
  updateProject,
  deleteProject,
};
