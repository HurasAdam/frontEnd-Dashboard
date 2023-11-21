
export const handleUpdateUser=(e,{formData,responseData},mutation)=>{
e.preventDefault()


const {name,surname,gender,birthDay,country,city,phone}=formData
const {name:responseName,surname:responseSurname,gender:responseGender,birthDay:responseBirthday,country:responseCountry,city:responseCity,phone:responsePhone}=responseData

const updateObj={}



if(name!==responseName){
    updateObj.name=name
}
if(surname!==responseSurname){
    updateObj.surname=surname
}
if(gender!==responseGender){
    updateObj.gender=gender
}
if(birthDay!==responseBirthday){
    updateObj.birthDay=birthDay
}
if(country!==responseCountry){
    updateObj.country=country
}
if(city!==responseCity){
    updateObj.city=city
}
if(phone!==responsePhone){
    updateObj.phone=phone
}

// else if (Object.keys(updateObj).length === 0) {
//     const errorObj = { message: "No changes were made. Make some changes to update the data.", success: false };
//     alert(errorObj.message)
// }
// else if(!name||!surname||!gender){
//     const errorObj= {message:"name,surname and gender are required. Please fill in required fields"}
//     alert(errorObj.message)
// }



// console.log(responseName)
mutation.mutate(updateObj)


}