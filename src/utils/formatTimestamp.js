export const formatTimestampWithTime = (date) => {
    const optionsDate = { day: "numeric", month: "short", year: "numeric" };
    const optionsTime = { hour12: true, hour: "numeric", minute: "numeric" };
  
    const formattedDate = new Date(date).toLocaleDateString("en-US", optionsDate);
    const formattedTime = new Date(date).toLocaleTimeString("en-US", optionsTime);
  
    return `${formattedDate} | ${formattedTime}`;
  };
  