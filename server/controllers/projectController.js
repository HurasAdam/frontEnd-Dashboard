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
console.log(projectLeader)
    //Find contributors in DB
    const projectContributor = await User.find({ _id: { $in: contributors } });
    const projectManager = await User.findOne({ email: projectLeader });

    const result = projectContributor.map((user) => {
      return {
        _id: user._id,
      };
    });

    const project = await Project.create({
      projectTitle,
      description,
     
      contributors: result,
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

  let size = 2;
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

 console.log(result)
 



  const { projects: queryString } = req.query;

  const isMember = (list, id) => {
    const check = list.filter((user) => user._id.toString() === id);
    return check.length > 0;
  };

  const userProjects = projects.filter((proj) => {
    return isMember(proj.contributors, userId);
  });

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
  const projectLeader = await User.findOne({ _id: project.projectLeader });

  const result = await Project.findOneAndUpdate(
    { _id: id },
    { $set: { contributors: contributors, projectLeader: projectLeader } }
  );

  res.status(200).json(result);
};

const updateProject = async (req, res) => {
  const { id } = req.params;
  const { projectTitle, description, createdBy, contributors } = req.body;
  const updates = req.body;
  const projectContributor = await User.find({ _id: { $in: contributors } });

  const newPM = await User.findOne({ _id: updates.projectLeader });

  const project = await Project.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        ...updates,
        projectLeader: {
          name: newPM.name,
          surname: newPM.surname,
          email: newPM.email,
          role: newPM.role,
          gender: newPM.gender,
          _id: newPM._id,
          userAvatar: newPM.userAvatar,
        },
      },
    }
  );

  res.status(200).json(project);
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
