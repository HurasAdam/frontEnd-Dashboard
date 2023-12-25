const userProjectActivity = require("../db/models/userProjectActivity")


const getMemberContributions=async(req,res)=>{

    const {id} = req.params
    // const {project,contributor} = req.query


    const activity = await userProjectActivity.find({projectId:id})

    res.status(200).json(activity)
}

module.exports = {
    getMemberContributions
}