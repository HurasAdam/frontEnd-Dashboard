const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const TicketSchema = new Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Object,
  },
  closedAt: {
    type: Object,
  },
  Archivized: {
    type: Boolean,
    default: false,
  },

  closedBy: {
    type: mongoose.Schema.Types.ObjectId,
  },
});

module.exports = mongoose.model("Tickets", TicketSchema);
