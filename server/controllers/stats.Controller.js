const mongoose = require("mongoose");
const Project = require('../db/models/project')
const Note=require('../db/models/note')
const getStats = async(req, res) => {

const projects=await Project.find({})
const notes=await Note.find({})
const result = {amount:projects.length}

  res.status(200).json(result);
};

module.exports = { getStats };
