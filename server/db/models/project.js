const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const projectSchema = new Schema({
  projectTitle: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  contributors:{
    type:Array,
    required:true
  },
  projectLeaderId:{
    type:String,
    required:true
  },
  projectLeader:{
    type:Object,
    required:false
  },
  createdAt:{
    type:Object
  }

});

const model = mongoose.model("Projects", projectSchema);

module.exports = model;
