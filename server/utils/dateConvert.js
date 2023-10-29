
const convertDate=(date)=>{

  
   const options = { 
     year: 'numeric', 
     month: '2-digit', 
     day: '2-digit', 
     hour: 'numeric',
     minute: 'numeric',
     hour12: false 
   };
   const now =  date.toLocaleString('pl-PL', options);
   console.log(now)
   return now

  }
  
 module.exports = {
    convertDate
 }
