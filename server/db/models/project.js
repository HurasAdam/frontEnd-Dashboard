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
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
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
      file_type: {
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
