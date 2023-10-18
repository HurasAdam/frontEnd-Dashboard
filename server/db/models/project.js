const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const projectSchema = new Schema({
  projectTitle: {
    type: String,
    required: [true, "Please enter the project name"],
  },
  description: {
    type: String,
    required: true,
  },
  contributors:{
    type:Array,
    required:[true, "Please asign atelast ONE project member"]
  },
  projectLeaderId:{
    type:String,
    required:[true, "Please choose a Project Leader"]
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
