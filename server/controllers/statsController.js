const mongoose = require("mongoose");
const Project = require('../db/models/project')
const Note=require('../db/models/note')
const getStats = async(req, res) => {

const projects=await Project.find({})
const notes=await Note.find({}).select("status")
const result = {amount:projects.length}

const ticketsOpen = notes.filter((note)=>note.status==='Open')
const ticketsClosed= notes.filter((note)=>note.status==='Closed')

  res.status(200).json({totalTickets:notes.length,ticketsOpen:ticketsOpen.length,ticketsClosed:ticketsClosed.length});
};

module.exports = { getStats };
