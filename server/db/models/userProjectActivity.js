const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const userProjectActivitySchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: false,
  },
  activityType:{
    type:String,
    required:true
  },
  date:{
type:Date,
default:function(){
    return new Date()
}
  }
});



userProjectActivitySchema.methods.addActivity = async function (activityObj) {
    this.userId = activityObj.userId;
    this.projectId = activityObj.projectId;
    this.activityType = activityObj.activityType;
    this.date = new Date();
    
    await this.save();
  };

const model = mongoose.model("UserProjectActivity", userProjectActivitySchema)
module.exports = model;