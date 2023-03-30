const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  surname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    require: true,
    uniqure: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  userAvatar:{
    type:String,
  },
  phone:{
    type:String,
  },
  birthDay:{
    type:String
  }
},{ timestamps: true });

const model = mongoose.model("User", userSchema);
module.exports = model;
