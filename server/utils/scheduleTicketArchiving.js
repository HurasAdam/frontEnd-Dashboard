const schedule = require('node-schedule');
const Note = require('../db/models/note')


const findAndArchivize = async(req,res)=>{
    // const allTickets= await Note.find({status:'Closed'})

   const xd = await Note.updateMany({status:'Closed'},{$set:{Archivized:true}})
   console.log('BANG')
   
}


const scheduleTicketArchiving = ()=>{
    schedule.scheduleJob('*/20 * * * * *', findAndArchivize)
   
}

module.exports = { scheduleTicketArchiving };




// *    *    *    *    *    *
// ┬    ┬    ┬    ┬    ┬    ┬
// │    │    │    │    │    │
// │    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
// │    │    │    │    └───── month (1 - 12)
// │    │    │    └────────── day of month (1 - 31)
// │    │    └─────────────── hour (0 - 23)
// │    └──────────────────── minute (0 - 59)
// └───────────────────────── second (0 - 59, OPTIONAL)