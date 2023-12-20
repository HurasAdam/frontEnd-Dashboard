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
  contributors: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      activity: {
        type: Number,
        default: 0,
      },
    },
  ],

  projectLeader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },

  files: [
    {
      publicId: {
        type: String,
      },
      url: {
        type: String,
      },
      original_name: {
        type: String,
      },
      file_size: {
        type: Number,
      },
      file_size_unit: {
        type: String,
        default: "mb",
      },
      file_type: {
        type: String,
      },
      createdAt: {
        type: String,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const model = mongoose.model("Projects", projectSchema);

module.exports = model;
