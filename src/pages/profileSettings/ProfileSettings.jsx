import "./profileSettings.css"
import {useFetch} from "../../hooks/useFetch"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../contexts/AuthContext"
import { settLocalStorage } from "../../utils/SettlocalStorage"
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import { ThemeContext } from '../../contexts/ThemeContext'
import { Link,Outlet } from "react-router-dom"
export const ProfileSettings=({updateUserData,uploadUserAvatar,data,handleInputUpdate,trigger})=>{

// const [data,isLoading,error]=useFetch('http://127.0.0.1:3000/api/user?settings=user')
const [userSettings,setUserSettings]=useState({})
const [selectedFile, setSelectedFile] = useState();
const [isEdited,setIsEdited]=useState(false)
const {user}=useContext(AuthContext)
const {theme}=useContext(ThemeContext)
const [checker,setChecker]=useState({})
// useEffect(()=>{
//     if(data){
//         setUserSettings(data)
//     }
// },[data])

// useEffect(()=>{
// check()
// },[])


// const check = ()=>{
//   const avatar = localStorage.getItem("userAvatar")
//   if(avatar){
//     setChecker(avatar)
//   }
 
// }


    return(

        <div className="profileSettings" id={theme.mode} >

<span className="profileSettingsTitle"><PeopleAltOutlinedIcon/> Profile Settings</span>

          {data&&<form className="profileSettingsForm" id={theme.mode}>
            <div className="profileSettingsItem">
              <label>Username</label>
              <input disabled={!isEdited} type="text" defaultValue={data.name}  onChange={(e)=>handleInputUpdate('name',e.target.value)}/>
            </div>
            <div className="profileSettingsItem">
              <label>Surname</label>
              <input disabled={!isEdited} type="text" defaultValue={data.surname} onChange={(e)=>handleInputUpdate('surname',e.target.value)}/>
            </div>
            <div className="profileSettingsItem">
              <label>Email</label>
              <input disabled={true} type="email" defaultValue={data.email} />
            </div>
        
            <div className="profileSettingsItem">
              <label>Phone</label>
              <input disabled={!isEdited} type="number" defaultValue={data.phone} onChange={(e)=>handleInputUpdate('phone',e.target.value)}/>
            </div>
            <div className="profileSettingsItem">
              <label>Adress</label>
              <input disabled={!isEdited} type="text" defaultValue={data.adress} onChange={(e)=>handleInputUpdate('adress',e.target.value)} />
            </div>
            <div className="profileSettingsItem">
              <label>Birthday</label>
              <input disabled={true} type="text" defaultValue={data.birthDay} />
            </div>
            <div className="profileSettingsItem">
              <label>Account created</label>
              {userSettings.createdAt&&<input disabled={true} type="text" 
              defaultValue={`${data.createdAt.Day}/${data.createdAt.Month}/${data.createdAt.Year}`}/>}
            </div>
            <div className="profileSettingsItem">
              <label>Account role</label>
              <input disabled={true} type="text" defaultValue={data.role}  />
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
            {isEdited?(<button className="profileSettingsButton" onClick={(e)=>trigger(e)}>Update</button>):
            (<button onClick={(e)=>{e.preventDefault();setIsEdited(true)}} className="profileSettingsButton">Edit</button>)}
            </div>
          </form>}

        </div>
    )
}