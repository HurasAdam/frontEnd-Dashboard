const ObjectId = require("mongodb").ObjectID;
const { scheduleTicketArchiving } = require("../utils/scheduleTicketArchiving");
const Note = require("../db/models/note");
const User = require("../db/models/user");
const Project = require("../db/models/project");
const { convertDate } = require("../utils/dateConvert");

// scheduleTicketArchiving()

module.exports = {
  //Zapisywanie notatki
  async saveNote(req, res) {
    const { project, title, priority, type, description } = req.body;
    const { _id: authorId } = req.user;
    const projectAsignedId = await Project.findOne({ _id: project }).select(
      "_id"
    );

    const newNote = new Note({
      project: projectAsignedId,
      title: title,
      priority: priority,
      author: authorId,
      description: description,
      type: type,
      createdAt: new Date(),
    });

    await newNote.save();
    res.status(201).json("KAPPA");
  },

  //podbieranie noatek
  async getAllNotes(req, res) {
    const notes = await Note.find({ Archivized: false });
    // const page = Number(req.query.page);
    // let size = 14;
    // const limit = parseInt(size);
    // const skip = (page - 1) * size;

    // let notes;
    // let allNotesCount;
    // try {
    //   allNotesCount = await Note.countDocuments();
    //   // console.log(typeof allNotesCount);
    //   notes = await Note.find({Archivized:false})
    //     .sort({ createdAt: -1 })
    //     .skip(skip)
    //     .limit(limit);
    // } catch (err) {
    //   return res.status(500).json({ error: err.message });
    // }

    res.status(200).json(notes);
  },

  async getArchived(req, res) {
    const page = Number(req.query.page);
    let size = 14;
    const limit = parseInt(size);
    const skip = (page - 1) * size;

    let notes;
    let allNotesCount;
    // try {
    allNotesCount = await Note.countDocuments();
    notes = await Note.find({ Archivized: true })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const ticketList = await Promise.all(
      notes.map((t) => User.findOne({ _id: t.closedBy }))
    );

    const result = notes.map((note) => {
      const ticketClosedBy = ticketList.find(
        (pl) => pl._id.toString() === note.closedBy.toString()
      );

      note["closedBy"] = ticketClosedBy;

      return note;
    });

    console.log(result);

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
    const userId = req.user._id;

    const { id } = req.params;

    const note = await Note.findOne({ _id: id });
const {_id,title,description,projectLeader} = await Project.findOne({_id:note.project})
    const ticketAuthor = await User.findOne(
      { _id: note.author },
      "name surname email role gender userAvatar"
    );
   
  
    const pLeader = await User.findOne({_id:projectLeader}).select('name surname role geneder userAvatar')
console.log(pLeader)

  const returnObj = {
 
    id: note._id,
    title:note.title,
    description:note.description,
    type:note.type,
    priority:note.priority,
    status:note.status,
    author:ticketAuthor,
    createdAt:note.createdAt,
project:{
  id:_id,
  title:title,
  description:description,
  projectLeader:pLeader

  }
}
 
  

    
    // const contributorAccess =
    //   conctibutorsList.includes(userId) || req.user.role === "admin";

    // const fullAccess =
    // req.user._id.toString()===ticketAuthor._id.toString() ||
    // req.user._id.toString()===projectLeader._id.toString()||
    // req.user.role === "admin";

    // const xd = {
    //   ticketId: note._id,
    //   title: note.title,
    //   status: note.status,
    //   priority: note.priority,
    //   type: note.type,
    //   author: {
    //     id: ticketAuthor._id,
    //     name: ticketAuthor.name,
    //     surname: ticketAuthor.surname,
    //     email: ticketAuthor.email,
    //     role: ticketAuthor.role,
    //     gender: ticketAuthor.gender,
    //     userAvatar: ticketAuthor.userAvatar,
    //   },
    //   description: note.description,
    //   createdAt: note.createdAt,
    //   project: {
    //     id: project._id.toString(),
    //     projectTitle: project.projectTitle,
    //     description: project.description,
    //     projectLeader: {
    //       id: projectLeader._id,
    //       name: projectLeader.name,
    //       surname: projectLeader.surname,
    //       email: projectLeader.email,
    //       role: projectLeader.role,
    //       gender: projectLeader.gender,
    //       userAvatar: projectLeader.userAvatar,
    //     },
    //   },
    //   fullAccess: fullAccess,
    //   contributorAccess: contributorAccess,
    // };
    res.status(200).json(returnObj);
  },

  //aktualizowanie notatki
  async updateNote(req, res) {
    const id = req.params.id;
    const updates = req.body;
    const { status } = req.body;
    const { _id: user } = req.user;

    const { status: ticketStatus } = await Note.findOne({ _id: id });
    const currentTicket = await Note.findOne({ _id: id });
const {_id:authorId} = await User.findOne({_id:currentTicket.author})
    const isAuthor = authorId.toString() === req.user._id.toString();
   

    try {
      if (!isAuthor || req.user.role !== "admin") {
        return res.status(400).json({message:"You dont have permissions to edit this ticket",success:false})
      }

      if (ticketStatus !== "Open") {
        return res.status(400).json({message:"Ticket status is already set as closed, You can not edit closed tickets", success:false})
      }

      let finalUpdates = { ...updates };
      if (status === "Closed") {
        finalUpdates = {
          ...updates,
          closedAt: new Date(),
          closedBy: user,
        };
      }
      const note = await Note.findOneAndUpdate(
        { _id: id },
        { $set: finalUpdates }
      );

      return res.status(200).json({message:"Ticket has been updated successfully", success:true});
    } catch (Error) {
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
