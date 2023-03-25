const Note = require("../db/models/note");
const User = require("../db/models/user");
const Project = require("../db/models/project");
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

    const check = await Project.find({ _id: project }).select(
      "_id title createdBy"
    );
    const findAuthor = await await User.find({ email: author });

    const projectObject = check.reduce((obj, item) => ({
      ...obj,
      [item.key]: item.value,
    }));
    const authorObject = findAuthor.reduce((obj, item) => ({
      ...obj,
      [item.key]: item.value,
    }));

    const newNote = new Note({
      project: projectObject,
      title: title,
      status: status,
      date: date,
      priority: priority,
      author: {
        name: authorObject.name,
        surname: authorObject.surname,
        email: authorObject.email,
      },
      description: description,
      type: type,
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

    res.status(200).json(note);
  },

  //aktualizowanie notatki
  async updateNote(req, res) {
    const id = req.params.id;
    const updates = req.body;

    const note = await Note.findOneAndUpdate({ _id: id }, { $set: updates });

    res.status(201).json(note);
  },

  //usuwanie notatki
  async deleteNote(req, res) {
    const id = req.params.id;
    await Note.deleteOne({ _id: id });

    res.status(204).send("status code of 200");
  },
};
