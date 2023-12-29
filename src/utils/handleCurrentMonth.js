export const handleCurrentMonth = () => {

    const monthList = [
        "january",
        "february",
        "march",
        "april",
        "may",
        "june",
        "july",
        "august",
        "september",
        "october",
        "november",
        "december",
      ];

    const date = new Date();
    const currentMonth = date.getMonth();
    const currentMonthName = monthList[currentMonth]
    return {monthList,currentMonthName}
  };