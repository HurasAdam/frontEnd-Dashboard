const ObjectId = require("mongodb").ObjectID;
const Note = require("../db/models/note");
const User = require("../db/models/user");
const Project = require("../db/models/project");
const { convertDate } = require("../utils/dateConvert");
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

    // const check = await Project.find({ _id: project }).select(
    //   "_id projectTitle projectLeader"
    // );

    const projectAsigned = await Project.findOne({ _id: project });

    console.log(projectAsigned);
    const findAuthor = await await User.find({ email: author });

    // const projectObject = check.reduce((obj, item) => ({
    //   ...obj,
    //   [item.key]: item.value,
    // }));
    const authorObject = findAuthor.reduce((obj, item) => ({
      ...obj,
      [item.key]: item.value,
    }));

    const newNote = new Note({
      project: projectAsigned._id,
      title: title,
      status: status,
      date: date,
      priority: priority,
      author: {
        name: authorObject.name,
        surname: authorObject.surname,
        email: authorObject.email,
        userAvatar: authorObject.userAvatar,
      },
      description: description,
      type: type,
      createdAt: convertDate(),
    });

    await newNote.save();
    res.status(201).json(newNote.body);
  },

  //podbieranie noatek
  async getAllNotes(req, res) {
    let doc;
    try {
      doc = await Note.find({});
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }

    res.status(200).json(doc);
  },

  //podbieranie noatki
  async getNote(req, res) {
    const id = req.params.id;
    const note = await Note.findOne({ _id: id });
    const projectId = note.project;
    const findProject = await Project.findOne({ _id: projectId.toString() });

    const xd = {
      _id: note._id,
      title: note.title,
      status: note.status,
      priority: note.priority,
      type: note.type,
      author: note.author,
      description: note.description,
      createdAt: note.createdAt,
      project: findProject,
    };
    console.log(xd);

    res.status(200).json(xd);
  },

  //aktualizowanie notatki
  async updateNote(req, res) {
    const id = req.params.id;
    const updates = req.body;

    const finalUpdates = {
      ...updates,
      project: new ObjectId(updates.project.id),
    };

    const note = await Note.findOneAndUpdate(
      { _id: id },
      { $set: finalUpdates }
    );

    res.status(201).json(note);
  },

  //usuwanie notatki
  async deleteNote(req, res) {
    const id = req.params.id;
    await Note.deleteOne({ _id: id });

    res.status(204).send("status code of 200");
  },
};
