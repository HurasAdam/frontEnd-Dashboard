const validateData = (data)=>{

    const validatorErrors=[]
  if(data){
   const keys = Object.keys(data)
  
  keys.forEach((key)=>{
   const value = data[key]
   
   if(!value){
    const error=`${key} is required`
    validatorErrors.push(error)
   }
  })
  if (validatorErrors.length > 0) {
    return {
      success: false,
      message: validatorErrors.join(", "),
    };
  }
  }
  return null
  }

  module.exports = {
    validateData
  };