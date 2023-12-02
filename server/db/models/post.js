const mongoose = require("mongoose");

const Schema= mongoose.Schema;
const PostSchema= new Schema({

ticketId:{
    type:String,
    required:true,
},
CreatedBy:{
    type:Object,
    
},
CreatedAt:{
    type:Date,
    required:true,
    default:Date.now
},
content:{
    type:String,
    required:true,
},

files:[{
    publicId:{
        type:String
    },
    url:{
        type:String
    },
    original_name:{
        type:String
    },
    file_size:{
        type:Number
    },
    file_type:{
        type:String
    }
}]



})

const model = mongoose.model("Post", PostSchema);
module.exports = model;