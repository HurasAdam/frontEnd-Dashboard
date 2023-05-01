export const ObjectDateToString=(isoDate)=>{
    const date = new Date(isoDate);
    const options = { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit', 
      hour: 'numeric',
      minute: 'numeric',
      hour12: false 
    };
    const now =  date.toLocaleString('pl-PL', options);
    return now
   }