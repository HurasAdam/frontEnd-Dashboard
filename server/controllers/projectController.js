const Project = require("../db/models/project");
const User = require("../db/models/user");
const Note = require("../db/models/note");
const { ObjectId } = require("mongodb");
//Create Projet
const createProject = async (req, res) => {
  const { title, description, contributors, createdBy } = req.body;
  try {
    if (!title || !description || !contributors || !createdBy) {
      throw Error("All fields have to be filled");
    }

    //Find contributors in DB
    const projectContributor = await User.find({ _id: { $in: contributors } });

    const result = projectContributor.map((user) => {
      return {
        _id: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        role: user.role,
      };
    });

    const project = await Project.create({
      title,
      description,
      contributors: result,
      createdBy,
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
  const projectPerPage=2;
  const { id: userId } = req.user;
  const { role } = req.role;
const page =Number(req.query.page)||0
console.log(typeof(page))
  const allProjects= await Project.find({})
  const projects = await Project.find({}).skip(page*projectPerPage).limit(projectPerPage);
  const { projects: check } = req.query;

  
  const isMember = (list, id) => {
    const check = list.filter((user) => user._id.toString() === id);
    return check.length > 0;
  };

  const result = projects.filter((proj) => {
    return isMember(proj.contributors, userId);
  });
  
  if(!check && typeof(page)==='number' ){
    res.status(200).json({itemPerPage:projectPerPage,total:(allProjects.length)/projectPerPage,page:page,projects:projects})
  }

  if (check==='userProjects'&& role==='admin'){
    res.status(200).json(allProjects);
    }
    else if(check==='userProjects'&& role!=='admin'){
      res.status(200).json(result)
    }

   
};

//Get Sinle Project

const getSingleProject = async (req, res) => {
  const { id } = req.params;

  const project = await Project.findOne({ _id: id });

  res.status(200).json(project);
};

const updateProject = async (req, res) => {
  const { id } = req.params;
  const { title, description, createdBy, contributors } = req.body;
  const updates = req.body;
  const projectContributor = await User.find({ _id: { $in: contributors } });
  

  const project = await Project.findOneAndUpdate(
    { _id: id },
    { $set: updates }
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
