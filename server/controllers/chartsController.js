const userProjectActivity = require("../db/models/userProjectActivity");

const getMemberContributions = async (req, res) => {
  const { id } = req.params;
  const { contributor, month } = req.query;
  let activity;

console.log(req.query)

  if (!contributor) {
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
    const monthNumber = monthMap[month.toLowerCase()];

    const year = new Date().getFullYear();
    startDate = new Date(year, monthNumber, 1, 1, 0, 0, 0);
    endDate = new Date(year, monthNumber + 1, 0, 23, 59, 59, 999);

    activity = await userProjectActivity.find({
      projectId: id,
      date: {
        $gte: startDate,
        $lt: endDate,
      },
    });
   return res.status(200).json(activity);
  }

  else if (contributor) {
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
    const monthNumber = monthMap[month.toLowerCase()];

    const year = new Date().getFullYear();
    startDate = new Date(year, monthNumber, 1, 1, 0, 0, 0);
    endDate = new Date(year, monthNumber + 1, 0, 23, 59, 59, 999);

    activity = await userProjectActivity.find({
      projectId: id,
      userId: contributor,
      date: {
        $gte: startDate,
        $lt: endDate,
      },
    });
    return res.status(200).json(activity);
  }
};
module.exports = {
  getMemberContributions,
};
