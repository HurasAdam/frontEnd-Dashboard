const ObjectId = require("mongodb").ObjectID;
const { scheduleTicketArchiving } = require("../utils/scheduleTicketArchiving");
const Note = require("../db/models/note");
const Post = require("../db/models/post");
const User = require("../db/models/user");
const Project = require("../db/models/project");
const cloudinary = require("cloudinary").v2;
const { convertDate } = require("../utils/dateConvert");

// scheduleTicketArchiving()

module.exports = {
  //Zapisywanie notatki
  async saveNote(req, res) {
    const { project, title, priority, type, description } = req.body;
    const { _id: authorId } = req.user;

    const projectt = await Project.findOne({ _id: project });

    const contributor = projectt.contributors.find(
      (contributor) => contributor._id.toString() === authorId.toString()
    );

 


const t  = new Date()
    const today = new Date().toISOString().substring(0,10)
    const tomorrow = new Date(t)
    tomorrow.setDate(t.getDate()+1)
const tomorrowIsoStr= tomorrow.toISOString().substring(0,10)
console.log(tomorrowIsoStr)
    const index = contributor.activity.findIndex(
      (activity) => activity.date.toISOString().substring(0,10) === tomorrowIsoStr
    );


    console.log(index)
    if (index !== -1) {
      // Znaleziono obiekt z dzisiejszą datą, inkrementuj contributions
      contributor.activity[index].contributions += 1;
    } else {
      // Brak obiektu z dzisiejszą datą, dodaj nowy obiekt
      contributor.activity.push({
        date: new Date(),
        contributions: 1,
      });
    }

    const newNote = new Note({
      project: projectt?._id,
      title: title,
      priority: priority,
      author: authorId,
      description: description,
      type: type,
      createdAt: new Date(),
    });

    await newNote.save();

    await projectt.save();
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
    //     const ticketList = await Promise.all(
    //       (
    //         await Note.find({ Archivized: true })
    //           .populate('closedBy') // Dodaj to, aby pobrać dane użytkownika
    //       ).map(async (ticket) => {
    //         // Pobierz dane użytkownika z związku
    //         const user = await User.findOne({_id:ticket.closedBy}).select('name surname email role gender userAvatar')

    //         // Tutaj możesz dodać inne transformacje, jeśli są potrzebne

    //         return {
    //           id: ticket._id,
    //           title: ticket.title,
    //           type: ticket.type,
    //           description: ticket.description,
    //           closedBy: user,
    //         };
    //       })
    //     );
    // console.log(ticketList)

    const archived = await Note.find({ Archivized: true }).populate({
      path: "closedBy",
      model: "User",
      select: "name surname email userAvatar gender",
    });

    res.status(200).json(archived);

    // const page = Number(req.query.page);
    // let size = 14;
    // const limit = parseInt(size);
    // const skip = (page - 1) * size;

    // let notes;
    // let allNotesCount;
    // // try {
    // allNotesCount = await Note.countDocuments();
    // notes = await Note.find({ Archivized: true })
    //   .sort({ createdAt: -1 })
    //   .skip(skip)
    //   .limit(limit);

    // const ticketList = await Promise.all(
    //   (
    //     await Note.find({ Archivized: true })
    //   ).map((ticket) => {
    //     const user = User.findOne({ _id: ticket.closedBy });
    //     return {
    //       id: ticket._id,
    //       title: ticket.title,
    //       type: ticket.type,
    //       description: ticket.description,
    //       closedBy: user,
    //     };
    //   })
    // );

    //   archiveNotes.map((ticket) => User.findOne({ _id: ticket.closedBy }))
    // );

    // console.log(ticketList)

    // const result = notes.map((note) => {
    //   const ticketClosedBy = ticketList.find(
    //     (pl) => pl._id.toString() === note.closedBy.toString()
    //   );

    //   note["closedBy"] = ticketClosedBy;

    //   return note;
    // });

    // console.log(result);

    // // } catch (err) {
    // //   return res.status(500).json({ error: err.message });
    // // }

    // res.status(200).json({
    //   page: page,
    //   pageSize: size,
    //   total: Math.ceil(allNotesCount / size),
    //   tickets: result,
    // });
  },

  //podbieranie noatki
  async getNote(req, res) {
    const userId = req.user._id;

    const { id } = req.params;

    const note = await Note.findOne({ _id: id });
    const { _id, title, description, projectLeader } = await Project.findOne({
      _id: note.project,
    });
    const ticketAuthor = await User.findOne(
      { _id: note.author },
      "name surname email role gender userAvatar"
    );

    const pLeader = await User.findOne({ _id: projectLeader }).select(
      "name surname role geneder userAvatar"
    );

    console.log("SPRAWDZAM ENDPOINT");
    const returnObj = {
      id: note._id,
      title: note.title,
      description: note.description,
      type: note.type,
      priority: note.priority,
      status: note.status,
      author: ticketAuthor,
      createdAt: note.createdAt,
      Archivized: note.Archivized,
      project: {
        id: _id,
        title: title,
        description: description,
        projectLeader: pLeader,
      },
    };

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
    const io = req.app.get("socketio");
    const id = req.params.id;
    const updates = req.body;

    const { title, priority, status, description } = req.body;
    const { _id: user } = req.user;

    const {
      title: ticketTitle,
      priority: ticketPriority,
      status: ticketStatus,
      description: ticketDescription,
      author: ticketAuthor,
    } = await Note.findOne({ _id: id });
    try {
      if (
        title === ticketTitle &&
        priority === ticketPriority &&
        status === ticketStatus &&
        description === ticketDescription
      ) {
        return res
          .status(304)
          .json({ message: "NO changes has been made", success: false });
      }

      const isAuthor = ticketAuthor.toString() === req.user._id.toString();

      if (!isAuthor || req.user.role !== "admin") {
        return res.status(400).json({
          message: "You dont have permissions to edit this ticket",
          success: false,
        });
      }

      if (ticketStatus !== "Open") {
        return res.status(400).json({
          message:
            "Ticket status is already set as closed, You can not edit closed tickets",
          success: false,
        });
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

      const eventStreamObject = { id: id, status: "update" };
      io.sockets.emit("ticketCollectionUpdate", eventStreamObject);

      return res.status(200).json({
        message: "Ticket has been updated successfully",
        success: true,
      });
    } catch (Error) {
      res.status(400).json(Error.message);
    }
  },

  //usuwanie notatki
  async deleteNote(req, res) {
    const { id } = req.params;

    const ticketPostList = await Post.find({ ticketId: id }).select("_id");

    if (ticketPostList.length > 0) {
      const arrayOfIds = ticketPostList.map(({ _id }) => {
        return _id;
      });

      const deletePromises = await Promise.all(
        arrayOfIds.map(async (id) => {
          const post = await Post.findOne({ _id: id });
          const files = post?.files;
          if (files.length > 0) {
            const cloudinaryResponse = files.map(
              async ({ publicId, file_type }) => {
                const { result } = await cloudinary.uploader.destroy(publicId, {
                  resource_type: file_type === "raw" ? "raw" : "image",
                });
                return result;
              }
            );
            const deletePost = await Post.findOneAndDelete({ _id: id });
          }
          const deletePost = await Post.findOneAndDelete({ _id: id });
        })
      );
      console.log("WIEKSZE OD 0");
      const deleteTicket = await Note.findOneAndDelete({ _id: id });
      return res
        .status(200)
        .json({ message: "Deleted successfully", success: true });
    }
    const deleteTicket = await Note.findOneAndDelete({ _id: id });

    console.log("BEZ POSTOW");
    return res
      .status(200)
      .json({ message: "Deleted successfully", success: true });
  },
};
