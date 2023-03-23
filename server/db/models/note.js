const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const TicketSchema = new Schema(
  {
    project: {
      type: Object,
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
      type: Object,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tickets", TicketSchema);
