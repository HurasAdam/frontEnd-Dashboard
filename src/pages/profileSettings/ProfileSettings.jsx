import "./profileSettings.css"
import {useFetch} from "../../hooks/useFetch"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../contexts/AuthContext"
import { settLocalStorage } from "../../utils/SettlocalStorage"
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import { ThemeContext } from '../../contexts/ThemeContext'
import { Link,Outlet } from "react-router-dom"
export const ProfileSettings=()=>{

const [data,isLoading,error]=useFetch('http://127.0.0.1:3000/api/user?settings=user')
const [userSettings,setUserSettings]=useState({})
const [selectedFile, setSelectedFile] = useState();
const [isEdited,setIsEdited]=useState(false)
const {user}=useContext(AuthContext)
const {theme}=useContext(ThemeContext)
const [checker,setChecker]=useState({})
useEffect(()=>{
    if(data){
        setUserSettings(data)
    }
},[data])

useEffect(()=>{
check()
},[])

const check = ()=>{
  const avatar = localStorage.getItem("userAvatar")
  if(avatar){
    setChecker(avatar)
  }
 
}

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
    if(response.ok){
     setIsEdited(false)
    }
}

const uploadUserAvatar = async (e) => {
    e.preventDefault()
    const file = new FormData();
    file.append("file", selectedFile);

    const response = await fetch(`http://127.0.0.1:3000/api/user/upload?id=${user.userId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
      body:
        file
        
      
    });
    if(response.ok){
const json = await response.json()





localStorage.setItem('userAvatar',json.data)
// localStorage.setItem('user', JSON.stringify(updatedUser))
}
  };

    return(

        <div className="profileSettings" id={theme.mode} >

<span className="profileSettingsTitle"><PeopleAltOutlinedIcon/> Profile Settings</span>

          <form className="profileSettingsForm" id={theme.mode}>
            <div className="profileSettingsItem">
              <label>Username</label>
              <input disabled={!isEdited} type="text" defaultValue={userSettings.name}  onChange={(e)=>setUserSettings({...userSettings, name:e.target.value})}/>
            </div>
            <div className="profileSettingsItem">
              <label>Surname</label>
              <input disabled={!isEdited} type="text" defaultValue={userSettings.surname} onChange={(e)=>setUserSettings({...userSettings, surname:e.target.value})}/>
            </div>
            <div className="profileSettingsItem">
              <label>Email</label>
              <input disabled={!isEdited} type="email" defaultValue={userSettings.email} onChange={(e)=>setUserSettings({...userSettings, email:e.target.value})} />
            </div>
        
            <div className="profileSettingsItem">
              <label>Phone</label>
              <input disabled={!isEdited} type="number" defaultValue={userSettings.phone} onChange={(e)=>setUserSettings({...userSettings, phone:e.target.value})}/>
            </div>
            <div className="profileSettingsItem">
              <label>Adress</label>
              <input disabled={!isEdited} type="text" defaultValue={userSettings.adress} onChange={(e)=>setUserSettings({...userSettings, adress:e.target.value})} />
            </div>
            <div className="profileSettingsItem">
              <label>Birthday</label>
              <input disabled={true} type="text" defaultValue={userSettings.birthDay} />
            </div>
            <div className="profileSettingsItem">
              <label>Account created</label>
              {userSettings.createdAt&&<input disabled={true} type="text" 
              defaultValue={`${userSettings.createdAt.Day}/${userSettings.createdAt.Month}/${userSettings.createdAt.Year}`}/>}
            </div>
            <div className="profileSettingsItem">
              <label>Account role</label>
              <input disabled={true} type="text" defaultValue={userSettings.role}  />
            </div>
            <div className="profileSettingsItem">
              <label>Gender</label>
              <div className="profileSettingsGender">
                <input disabled={true} type="radio" name="gender" id="male" value="male" checked={userSettings.gender==='male'} />
                <label for="male">Male</label>
                <input disabled={true} type="radio" name="gender" id="female" value="female" checked={userSettings.gender==='female'} />
                <label for="female">Female</label>
             
              </div>
            </div>
            <div className="profileSettingsItem-inputFile">
              <label>change photo</label>
          <input type="file" 
          onChange={(e) => setSelectedFile(e.target.files[0])}
          />
          <button onClick={uploadUserAvatar}>Save</button>
            </div>
            <div className="profileSettingsButtonContainer">
            {isEdited?(<button className="profileSettingsButton" onClick={updateUserData}>Update</button>):
            (<button onClick={(e)=>{e.preventDefault();setIsEdited(true)}} className="profileSettingsButton">Edit</button>)}
            </div>
          </form>

        </div>
    )
}