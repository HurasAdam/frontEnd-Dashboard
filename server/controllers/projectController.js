
const Project = require("../db/models/project");
const User = require("../db/models/user");
//Create Projet
const createProject = async (req, res) => {
  const { title, description, contributors, createdBy } = req.body;
  try {
    if (!title || !description || !contributors || !createdBy) {
      throw Error("All fields have to be filled");
    }

    //Find contributors in DB
    const projectContributor = await User.find({ _id: { $in: contributors } });
console.log(projectContributor)


const result = projectContributor.map((user)=>{
  return{_id:user._id,name:user.name,surname:user.surname,email:user.email,role:user.role}})

console.log(result)

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

  const projects = await Project.find({});

  const { projects: check } = req.query;

  const exist = (list, id) => {
    const check = list.filter((user) => user._id.toString() === id);
   
    return check.length > 0;
  };

  const userProjects = projects.filter((project) => {
    return exist(project.contributors, userId);
  });

  if (!check) {
    res.status(200).json(projects);
  } else if (check) {
    res.status(200).json(userProjects);
  }

  // //conditional return : ProjectList or filtered userProjectList
  // if (check) {
  //   const userProjects = projects.filter((obj) => {
  //     return obj.contributors.some((object) => object === id);
  //   });
  //   console.log(userProjects)
  //   res.status(200).json(userProjects);
  // }
  // if (!check) {
  //   res.status(200).json(projects);
  // }
};

//Get Sinle Project

const getSingleProject = async (req, res) => {
  const { id } = req.params;

  const project = await Project.findOne({ _id: id });

  res.status(200).json(project);
};

module.exports = {
  createProject,
  getProjectList,
  getSingleProject,
};
