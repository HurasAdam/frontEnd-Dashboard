const mongoose = require("mongoose");




const Schema = mongoose.Schema;

const projectSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  contributors: [],

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




// projectSchema.methods.grpBy = async function async(project) {
//   console.log(project);
// };

// projectSchema.methods.addActivity = async function (
//   addedContributions,
//   contributor
// ) {
//   const currentDate = new Date();
//   const currentMonth = currentDate.getMonth() + 1;
//   const currentYear = currentDate.getFullYear();
//   const currentDay = currentDate.getDate();


//   const getDaysInMonth = (year, month) => {
//     return new Date(year, month + 1, 0).getDate();
//   };

//   const days = getDaysInMonth(currentYear, currentMonth);
//   const daysObject = Array.from({ length: days }, (_, index) => ({
   
//     day: index + 1,
//     contributions: 0,
//   }));

//   const contributorAcitivty = contributor?.activity;
//   const doesMonthExist = contributorAcitivty.some((obj) => {
//     return obj.month === currentMonth;
//   });

//   const dailyContributions = daysObject.map((day) => {
//     if (day.day === currentDay) {
//       return { ...day, contributions: day.contributions + 1 };
//     } else {
//       return { ...day };
//     }
//   });

//   console.log(dailyContributions);

//   if (!doesMonthExist) {
//     const monthObj = {
//       month: currentMonth,
//       days: dailyContributions,
//     };
//     contributorAcitivty.push(monthObj);
//   } else {
//     const index = contributorAcitivty.findIndex((obj) => {
//       return obj.month === currentMonth;
//     });
//     const incrementContirbutionCounter =
//       contributorAcitivty[index].days[currentDay - 1];
//     incrementContirbutionCounter.contributions += addedContributions;
//     // console.log(incrementContirbutionCounter)
//   }

//   await this.save();
// };

const model = mongoose.model("Projects", projectSchema);

module.exports = model;
