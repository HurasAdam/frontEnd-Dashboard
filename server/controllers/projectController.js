const Project = require("../db/models/project");
const User = require("../db/models/user");
const {ObjectId } = require('mongodb');
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
  const { id: userId } = req.user;
  const { role } = req.role;
  console.log(role);
  const projects = await Project.find({});
  const { projects: check } = req.query;

  const isMember = (list, id) => {
    const check = list.filter((user) => user._id.toString() === id);
    return check.length > 0;
  };

  const result = projects.filter((proj) => {
    return isMember(proj.contributors, userId);
  });

  if (!check) {
    res.status(200).json(projects);
  }

  if (check)
    if (role === "admin") {
      res.status(200).json(projects);
    } else {
      res.status(200).json(result);
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

  const project = await Project.findOneAndUpdate({ _id: id },
    {
      title: title,
      description: description,
      createdBy: createdBy,
      contributors: result,
    }
  );

  res.status(200).json(project);
};


const deleteProject=async(req,res)=>{
const {id}=req.params


const project = await Project.findOneAndRemove({_id:id})
console.log(project)

}

module.exports = {
  createProject,
  getProjectList,
  getSingleProject,
  updateProject,
  deleteProject
};
