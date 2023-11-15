const getOptionList = (req, res) => {
  const options = [
    { value: "Low", label: "Low", color: "#00FF00" },
    { value: "Medium", label: "Medium", color: "#FFFF00" },
    { value: "High", label: "High", color: "#FF0000" },
  ];

  return res.status(200).json(options);
};

module.exports = {
  getOptionList,
};
