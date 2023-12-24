const Project = require("../db/models/project")


const getMemberContributions=async(req,res)=>{

    const {project,contributor} = req.query
    // Project.aggregate(
    //     [
    //        {$match:{
    //         "contributors._id":mongoose.Types.ObjectId(userId)
    //        }},
    //        {
    //         $unwind:"$contributors"
    //        },
    //        {
    //         $match:{
    //             "contributors._id"
    //         }
    //        }
    //     ]
    // )

 
const currentProject = await Project.findOne({_id:project})

currentProject.grpBy(currentProject.contributors[0].activity)

const contributors= currentProject.contributors
const currentContributor = contributors.filter((cont)=>cont._id.toString()===contributor)
return res.status(200).json(currentContributor)

}

module.exports = {
    getMemberContributions
}