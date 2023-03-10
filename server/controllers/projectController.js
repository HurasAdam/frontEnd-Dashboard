const Project = require("../db/models/project");
const User = require("../db/models/user");
//Create Projet
const createProject = async (req, res) => {
  const { title, description, contributors,createdBy } = req.body;
  try {
    if (!title || !description||!contributors||!createdBy) {
      throw Error("All fields have to be filled");
    }

    
    const project = await Project.create({ title, description,contributors,createdBy });
  
    res.status(201).json(project);
  } catch (Error) {
    console.log(Error.message);
    res.status(400).json(Error.message);
  }
};

//Get All Projects
const getProjectList = async (req, res) => {
  const projects = await Project.find({});

  res.status(200).json(projects);
};

//Get Sinle Project

const getSingleProject = async (req, res) => {
  const { id } = req.params;

  const project = await Project.findOne({ _id:id} );

  res.status(200).json(project);
};

module.exports = {
  createProject,
  getProjectList,
  getSingleProject,
};
