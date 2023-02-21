const mongoose= require('mongoose')

const Note= mongoose.model('Note',{
    id:String,
    title:String,
    status:String,
    date:String,
    priority:String,
    author:String,
    description:String,
    type:String,
    
});

module.exports= Note;

const name = 'Adam';
console.log(name)