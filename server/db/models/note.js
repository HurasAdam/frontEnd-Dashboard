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
    default:"Open"
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
    default:new Date()
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

const model = mongoose.model("Tickets", TicketSchema);
module.exports=model