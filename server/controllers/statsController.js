const mongoose = require("mongoose");
const Project = require('../db/models/project')
const Note=require('../db/models/note')
const getStats = async(req, res) => {

const projects=await Project.find({})
const kek = await Note.find({})

const lol = kek.sort((a,b)=> new Date(b.createdAt)- new Date(a.createdAt))
const cut = lol.slice(kek.length-8,kek.length)
console.log(cut)
const notes=await Note.find({}).select("status")
const xd = await Note.find({}).select("type")
const result = {amount:projects.length}

const ticketsOpen = notes.filter((note)=>note.status==='Open')
const ticketsClosed= notes.filter((note)=>note.status==='Closed')

const ticketTypeBug = xd.filter((note)=>note.type===`Bug`)
const ticketTypeEnhancement = xd.filter((note)=>note.type===`Enhancement`)
const ticketTypeQuestion = xd.filter((note)=>note.type==='Question')
// console.log(ticketTypeQuestion)

  res.status(200).json(
    [
      {name:'totalTickets',value:notes.length},
      {name:'ticketsOpen',value:ticketsOpen.length},
      {name:'ticketsClosed',value:ticketsClosed.length},
      {name:'Question',value:ticketTypeQuestion.length},
      {name:'Enhancement',value:ticketTypeEnhancement.length},
      {name:'Bug',value:ticketTypeBug.length},
      {name:'LastAdded',value:cut}
    
    ]);
};

module.exports = { getStats };
