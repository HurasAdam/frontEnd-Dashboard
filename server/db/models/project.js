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
    type:Object,
    required:true
  },
  createdAt:{
    type:Object
  }

});

const model = mongoose.model("Projects", projectSchema);

module.exports = model;
