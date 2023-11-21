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
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  gender:{
    type:String,
    
  },
  userAvatar:{
   url:{
    type:String,
    default:""
   },
   publicId:{
    type:String,
    default:""
   }
  },
  phone:{
    type:String,
  },
  birthDay:{
    type:String
  },
  country:{
    type:String,
    default:""
  },
  city:{
    type:String,
    default:""
  },
  createdAt:{
    type: Object
  },
  theme:{
    type:String,
    default:'LIGHT'
  }
});

const model = mongoose.model("User", userSchema);
module.exports = model;
