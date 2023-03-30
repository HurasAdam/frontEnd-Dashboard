
const convertDate=()=>{

    const timestamp = new Date()
    let Day = new Date(timestamp).getDate()
    let Month= new Date(timestamp).getMonth()
    let Year = new Date(timestamp).getFullYear()
    let Hours = new Date(timestamp).getHours()
    let Minutes = new Date(timestamp).getMinutes()
  
    Day<10?Day=`0${Day}`:Day=Day
    Month<10?Month=`0${Month+1}`:Month=Month+1
    Hours<12?Hours=`0${Hours}AM`:Hours=`0${Hours}PM`
    return {Day,Month,Year,Hours,Minutes}
  }
  
 module.exports = {
    convertDate
 }