const Project = require("../db/models/project")


const getMemberContributions=async(req,res)=>{

    const {project,contributor} = req.query
  

 
const xd = await Project.findOne({_id:project})


const currentContributors= xd.contributors
const filter = currentContributors.filter((cont)=>cont._id.toString()===contributor)
return res.status(200).json(filter)
   

}

module.exports = {
    getMemberContributions
}