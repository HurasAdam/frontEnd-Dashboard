const userProjectActivity = require("../db/models/userProjectActivity")


const getMemberContributions=async(req,res)=>{

    const {id} = req.params
    const {contributor} = req.query
console.log(req.query)
let activity;
if(!contributor){
     activity = await userProjectActivity.find({projectId:id})
}
else{
    activity = await userProjectActivity.find({projectId:id, userId:contributor})
}
   

    res.status(200).json(activity)
}

module.exports = {
    getMemberContributions
}