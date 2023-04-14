const mongoose = require("mongoose");

const Schema= mongoose.Schema;
const PostSchema= new Schema({

TicketId:{
    type:String,
    required:true
},
CreatedBy:{
    type:String,
    required:true
},
CreatedAt:{
    type:Date,
    required:true,
    default:Date.now
},
Content:{
    type:String,
    required:true,
}


})

const model = mongoose.model("Post", PostSchema);
module.exports = model;