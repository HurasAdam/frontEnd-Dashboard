const userProjectActivity = require("../db/models/userProjectActivity");

const getMemberContributions = async (req, res) => {
  const { id } = req.params;
  const { contributor,month } = req.query;

 let activity;


if(month){
  const monthMap = {
    january: 0,
    february: 1,
    march: 2,
    april: 3,
    may: 4,
    june: 5,
    july: 6,
    august: 7,
    september: 8,
    october: 9,
    november: 10,
    december: 11,
  };
  const monthNumber = monthMap[month.toLowerCase()]
 
  if (monthNumber !== undefined){
    const year = new Date().getFullYear()
    startDate = new Date(year, monthNumber, 1, 1, 0, 0, 0);
    endDate = new Date(year, monthNumber + 1, 0, 23, 59, 59, 999);
    console.log(startDate)
    console.log(endDate)
 
    activity = await userProjectActivity.find({
      date: {
        $gte: startDate,
        $lt: endDate,
      },
    });

  }
 
}

  // const startDate = new Date('2023-12-20T00:00:00.000Z');
  // const endDate = new Date('2023-12-22T23:59:59.999Z');

  res.status(200).json(activity);

  // if (!contributor) {
  //   activity = await userProjectActivity.find({ projectId: id });




 
};

module.exports = {
  getMemberContributions,
};
