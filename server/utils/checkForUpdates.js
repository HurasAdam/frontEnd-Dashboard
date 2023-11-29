
const checkForUpdates= (inputData,dbData)=>{

const updateObj={}

    Object.keys(inputData).forEach((fieldName)=>{
        const value = inputData[fieldName]
        if(value!==dbData[fieldName]){
            updateObj[fieldName]=value
        }
      })

      if(Object.keys(updateObj).length>0){
        return updateObj
      }
else{
    return null
}


}

module.exports={
    checkForUpdates
}