const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const TicketSchema = new Schema(
  {
    project: {
      type: String,
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
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    createdAt:{
      type:String
    }
  },
 
);

module.exports = mongoose.model("Tickets", TicketSchema);
