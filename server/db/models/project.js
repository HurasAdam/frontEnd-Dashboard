const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const projectSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  contributors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref:"User",
    required: true,
  }],

  projectLeader: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"User",
    required: false,
  },
  createdAt: {
    type: Object,
  },
});

const model = mongoose.model("Projects", projectSchema);

module.exports = model;
