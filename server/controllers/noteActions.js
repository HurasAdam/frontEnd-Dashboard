const Note= require('../db/models/note');
const User = require("../db/models/user")
module.exports={

    //Zapisywanie notatki
   async saveNote(req,res){
       const title=req.body.title;
       
       const status='Open'
       const date= req.body.date;
       const priority=req.body.priority;
       const author=req.body.author;
       const description= req.body.description;
       const type=req.body.type

       const ticketAuthor= await User.findOne({author})
       const {id}=ticketAuthor

       console.log(ticketAuthor.email)
        const newNote= new Note({
            title:title,
           status:status,
           date:date,
           priority:priority,
           author:id,
           description:description,
           type:type,
    
        })
        console.log(req.body.priority);
       
await newNote.save();
        res.status(201).json(newNote.body);
    },


//podbieranie noatek
   async getAllNotes(req,res){
    let doc;
    try{   
     doc= await Note.find({});
   
    }catch(err){
       return res.status(500).json({error:err.message});
    }

res.status(200).json(doc);
      
    },

       //podbieranie noatki
    async getNote(req,res){
     const id=req.params.id;
     const note=await Note.findOne({_id:id});
res.status(200).json(note);
    },

    //aktualizowanie notatki
    async updateNote(req,res){
    const id=req.params.id;
   
    const title=req.body.title;
    const status=req.body.status;
    const priority=req.body.priority;
    const date=req.body.date;
    const description=req.body.description;
    const body=req.body.body;
console.log(req.body);
    const note= await Note.findOne({_id:id});
   
    note.title=title;
    note.status=status;
    note.priority=priority;
    note.date=date;
    note.description=description
    await note.save();
res.status(201).json(note);
    },

      //usuwanie notatki
 async deleteNote(req,res){
        const id = req.params.id;
        await Note.deleteOne({_id:id});
      
res.status(204).send('status code of 200')
    }
}

