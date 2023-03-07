const Project = require("../db/models/project");

//Create Projet
const createProject = async (req, res) => {
  const { title, status, ContributorsId } = req.body;
  try {
    if (!title || !status) {
      throw Error("All fields have to be filled");
    }

    const project = await Project.create({ title, status });
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

const getSingleProject=async(req,res)=>{

    const{id}=req.body;

    const project = await Project.findOne({id})


}


module.exports = {
  createProject,
  getProjectList,
};
