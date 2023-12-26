const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: {
    type: String,
    minLength:[3,`name is too short, it should contain atleast 3 characters`],
    maxLength:50,
    required: [true," Name is required"],
    validate:{
      validator:v=>v==='string',
      message:props=>`${props.value} is not and string`
    }

  },

  surname: {
    type: String,
    maxLength:50,
    minLength:[3,`surname is too short, it should contain atleast 3 characters`],
    required: [true," Surname is required"],
  },
  email: {
    type: String,
    maxLength:320,
    require: [true, "Email is required"],
    unique: true,
    lowercase:true,
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
  theme:{
    type:String,
    default:'LIGHT'
  },
  createdAt:{
    type:Date,
    immutable:true,
    default:()=>Date.now()
  },
  updatedAt:{
    type:Date,
    default:()=>Date.now()
  }
});

const model = mongoose.model("User", userSchema);
module.exports = model;
