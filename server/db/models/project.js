const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const daySchema= new Schema({
  date:{
    type:Date,
    default:function(){
      return new Date()
    }
  },
  contributions:{
    type:Number,
    default:0
  },
  day:{
    type:Number
  }
  
})

const monthSchema = new Schema({
  month:{
    type:Number,
    required:true
  },
  days:[daySchema]
})

const contributorSchema = new Schema({
  _id:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  activity:[monthSchema]
})


const projectSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  contributors: [contributorSchema],

  projectLeader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },

  files: [
    {
      publicId: {
        type: String,
      },
      url: {
        type: String,
      },
      original_name: {
        type: String,
      },
      file_size: {
        type: Number,
      },
      file_size_unit: {
        type: String,
        default: "mb",
      },
      file_type: {
        type: String,
      },
      createdAt: {
        type: String,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

projectSchema.methods.addActivity = async function (contributions,contributorId) {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; // Miesiące są indeksowane od zera
  const currentYear = currentDate.getFullYear();

  // Sprawdzamy, czy istnieje już obiekt dla bieżącego miesiąca
const getDaysInMonth = (year,month)=>{
 return  new Date(year, month + 1, 0).getDate()
}

const days = getDaysInMonth(currentYear,currentMonth)
const daysObject= Array.from({length:days},(_,index)=>({
  day:index+1,
  contributions:0
}))



const contributorAcitivty= contributorId.activity



const index = contributorAcitivty.findIndex((obj) => obj.month === currentMonth);

if (index !== -1) {

  console.log("Index obiektu:", index);
console.log(contributorAcitivty[index])
}

const monthObj = {
month:currentMonth,
days:daysObject
}
contributorAcitivty.push
(monthObj)



  // if (currentMonthObject) {
  //   // Jeśli istnieje, zwiększamy istniejącą aktywność
  //   currentMonthObject.days.forEach((day) => {
  //     day.contributions += contributions;
  //   });
  // } else {
  //   // Jeśli nie istnieje, tworzymy nowy obiekt miesiąca
  //   const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
  //   const newMonthObject = {
  //     month: currentMonth,
  //     days: Array.from({ length: daysInMonth }, () => ({
  //       date: new Date(currentYear, currentMonth - 1, day + 1),
  //       contributions: contributions,
  //     })),
  //   };

  //   this.activity.push(newMonthObject);
  // }

  await this.save();
};




const model = mongoose.model("Projects", projectSchema);

module.exports = model;
