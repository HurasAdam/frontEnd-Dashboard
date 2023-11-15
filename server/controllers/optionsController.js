const getOptionList = (req, res) => {
  const options = {
    priority: [
      { value: "Low", label: "Low", color: "#00FF00" },
      { value: "Medium", label: "Medium", color: "#FFFF00" },
      { value: "High", label: "High", color: "#FF0000" },
    ],

    status: [
      { value: "Open", label: "Open", color: "#00FF00" },
      { value: "Closed", label: "Closed", color: "#FFFF00" },
    ],
  };

  return res.status(200).json(options);
};

module.exports = {
  getOptionList,
};
