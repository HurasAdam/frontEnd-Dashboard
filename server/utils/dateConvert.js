const convertDate = ({date,includeHrs}) => {
   const newD = new Date(date);
 console.log(includeHrs)

const options= {}

 switch(includeHrs){
   case true:
      
         options.year= 'numeric',
         options.month= 'numeric',
         options.day= 'numeric',
         options.hour='numeric',
         options.minute='numeric'
         options.hour12= false;   
 break;

 case false:
   options.year= 'numeric',
   options.month= 'numeric',
   options.day= 'numeric',
   options.hour12= false;
break
      
   }

   const now = newD.toLocaleString(undefined, options);
  
   return now;
 }
 
 module.exports = {
   convertDate
 }