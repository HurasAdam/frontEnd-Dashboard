import "../settingsPage/settingsPage.css"
import {useFetch} from "../../hooks/useFetch"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../contexts/AuthContext"
export const SettingsPage=()=>{

const [data,isLoading,error]=useFetch('http://127.0.0.1:3000/api/user?settings=user')
const [userSettings,setUserSettings]=useState({})
const {user}=useContext(AuthContext)

useEffect(()=>{
    if(data){
        setUserSettings(data)
    }
},[data])

const updateUserData=async(e)=>{
e.preventDefault()
    const response = await fetch(`http://127.0.0.1:3000/api/user/`,{
        method:"PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify(userSettings),
        
    })
}


    return(

        <div className="settingsPage">

<h1 className="settingsPageTitle">Account Settings</h1>
          <form className="settingsPageForm">
            <div className="settingsPageItem">
              <label>Username</label>
              <input type="text" defaultValue={userSettings.name}  onChange={(e)=>setUserSettings({...userSettings, name:e.target.value})}/>
            </div>
            <div className="settingsPageItem">
              <label>Surname</label>
              <input type="text" defaultValue={userSettings.surname} onChange={(e)=>setUserSettings({...userSettings, surname:e.target.value})}/>
            </div>
            <div className="settingsPageItem">
              <label>Email</label>
              <input type="email" defaultValue={userSettings.email} onChange={(e)=>setUserSettings({...userSettings, email:e.target.value})} />
            </div>
        
            <div className="settingsPageItem">
              <label>Phone</label>
              <input type="number" defaultValue={userSettings.phone} onChange={(e)=>setUserSettings({...userSettings, phone:e.target.value})}/>
            </div>
            <div className="settingsPageItem">
              <label>Adress</label>
              <input type="text" defaultValue={userSettings.adress} onChange={(e)=>setUserSettings({...userSettings, adress:e.target.value})} />
            </div>
            <div className="settingsPageItem">
              <label>Birthday</label>
              <input disabled={true} type="text" defaultValue={userSettings.birthDay} />
            </div>
            <div className="settingsPageItem">
              <label>Account created</label>
              {userSettings.createdAt&&<input disabled={true} type="text" 
              defaultValue={`${userSettings.createdAt.Day}/${userSettings.createdAt.Month}/${userSettings.createdAt.Year}`}/>}
            </div>
            <div className="settingsPageItem">
              <label>Account role</label>
              <input disabled={true} type="text" defaultValue={userSettings.role}  />
            </div>
            <div className="settingsPageItem">
              <label>Gender</label>
              <div className="settingsPageGender">
                <input type="radio" name="gender" id="male" value="male" />
                <label for="male">Male</label>
                <input type="radio" name="gender" id="female" value="female" />
                <label for="female">Female</label>
                <input type="radio" name="gender" id="other" value="other" />
                <label for="other">Other</label>
              </div>
            </div>
            <div className="settingsPageItem">
              <label>Active</label>
              <select className="settingsPageSelect" name="active" id="active">
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div className="settingsPageButtonContainer">
            <button className="settingsPageButton" onClick={updateUserData}>Update</button>
            </div>
          </form>
        </div>
    )
}