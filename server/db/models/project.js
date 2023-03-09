const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const projectSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique:true,
  },
  description: {
    type: String,
    required: true,
  },
  contributors:{
    type:Array,
    required:true
  },
  createdBy:{
    type:String,
    required:true
  }

}, { timestamps: true });

const model = mongoose.model("Projects", projectSchema);

module.exports = model;
