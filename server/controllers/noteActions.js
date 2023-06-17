const ObjectId = require("mongodb").ObjectID;
const {scheduleTicketArchiving} = require('../utils/scheduleTicketArchiving')
const Note = require("../db/models/note");
const User = require("../db/models/user");
const Project = require("../db/models/project");
const { convertDate } = require("../utils/dateConvert");

// scheduleTicketArchiving()

module.exports = {
  //Zapisywanie notatki
  async saveNote(req, res) {
    const title = req.body.title;
    const project = req.body.project;
    const status = "Open";
    const date = req.body.date;
    const priority = req.body.priority;
    const author = req.body.author;
    const description = req.body.description;
    const type = req.body.type;

    const projectAsigned = await Project.findOne({ _id: project });
    const ticketAuthor = await await User.findOne({ email: author });

    const newNote = new Note({
      project: projectAsigned._id,
      title: title,
      status: status,
      date: date,
      priority: priority,
      author: ticketAuthor._id.toString(),
      description: description,
      type: type,
      createdAt: new Date()
    });

    await newNote.save();
    res.status(201).json(newNote.body);
  },

  //podbieranie noatek
  async getAllNotes(req, res) {
    const page = Number(req.query.page);
    let size = 14;
    const limit = parseInt(size);
    const skip = (page - 1) * size;

    let notes;
    let allNotesCount;
    try {
      allNotesCount = await Note.countDocuments();
      // console.log(typeof allNotesCount);
      notes = await Note.find({Archivized:false})
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }

    res.status(200).json({
      page: page,
      pageSize: size,
      total: Math.ceil(allNotesCount / size),
      tickets: notes,
    });
  },

  async getArchived(req,res){
    const page = Number(req.query.page);
    let size = 14;
    const limit = parseInt(size);
    const skip = (page - 1) * size;

    let notes;
    let allNotesCount;
    // try {
      allNotesCount = await Note.countDocuments();
      notes = await Note.find({Archivized:true})
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);


        const ticketList = await Promise.all((notes.map((t)=> User.findOne({_id:t.closedBy})))) 


        const result = notes.map((note)=>{
         const ticketClosedBy = ticketList.find((pl)=>pl._id.toString()===note.closedBy.toString())
       
         note["closedBy"]=ticketClosedBy
         
         return note
        })

console.log(result)

    // } catch (err) {
    //   return res.status(500).json({ error: err.message });
    // }

    res.status(200).json({
      page: page,
      pageSize: size,
      total: Math.ceil(allNotesCount / size),
      tickets: result,
    });
  

  },

  //podbieranie noatki
  async getNote(req, res) {
    const userId = req.user._id.toString();

    const id = req.params.id;
    const note = await Note.findOne({ _id: id });

    const ticketAuthor = await User.findOne({ _id: note.author });
    const project = await Project.findOne({ _id: note.project });
    const conctibutorsList = project.contributors;
    const contributorAccess =
      conctibutorsList.includes(userId) || req.user.role === "admin";

    const projectLeader = await User.findOne({ _id: project.projectLeaderId });
    const fullAccess =
      ticketAuthor.author === req.user._id.toString() ||
      req.user.role === "admin";

    const xd = {
      ticketId: note._id,
      title: note.title,
      status: note.status,
      priority: note.priority,
      type: note.type,
      author: {
        id: ticketAuthor._id,
        name: ticketAuthor.name,
        surname: ticketAuthor.surname,
        email: ticketAuthor.email,
        role: ticketAuthor.role,
        gender: ticketAuthor.gender,
        userAvatar: ticketAuthor.userAvatar,
      },
      description: note.description,
      createdAt: note.createdAt,
      project: {
        id: project._id.toString(),
        projectTitle: project.projectTitle,
        description: project.description,
        projectLeader: {
          id: projectLeader._id,
          name: projectLeader.name,
          surname: projectLeader.surname,
          email: projectLeader.email,
          role: projectLeader.role,
          gender: projectLeader.gender,
          userAvatar: projectLeader.userAvatar,
        },
      },
      fullAccess: fullAccess,
      contributorAccess: contributorAccess,
    };
    res.status(200).json(xd);
  },

  //aktualizowanie notatki
  async updateNote(req, res) {
    const id = req.params.id;
    const updates = req.body;
const {status}=req.body
const {_id:user}=req.user

const {status:ticketStatus}=await Note.findOne({_id:id})
    const currentTicket = await Note.findOne({ _id: id });

    const isAuthor = currentTicket.author === req.user._id.toString();

    try {
      if (!isAuthor || req.user.role!=='admin') {
        throw Error("You dont have permissions to edit this ticket");
      }

    if (ticketStatus!=='Open') {
      throw Error("Ticket status is already set as closed, You can not edit closed tickets");
    }
    


      let finalUpdates = {...updates};
      if(status==='Closed'){
        finalUpdates={
          ...updates,
          closedAt:new Date(),
          closedBy:user
        }
      }
      const note = await Note.findOneAndUpdate(
        { _id: id },
        { $set: finalUpdates }
      );

      return res.status(201).json(note);
      }catch(Error){
        res.status(400).json(Error.message);
      }
  },

  //usuwanie notatki
  async deleteNote(req, res) {
    const id = req.params.id;
    await Note.deleteOne({ _id: id });

    res.status(204).send("status code of 200");
  },
};






