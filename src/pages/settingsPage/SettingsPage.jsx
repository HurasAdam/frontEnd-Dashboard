import "../settingsPage/settingsPage.css"
import {useFetch} from "../../hooks/useFetch"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../contexts/AuthContext"
import { settLocalStorage } from "../../utils/SettlocalStorage"
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import { ThemeContext } from '../../contexts/ThemeContext'
export const SettingsPage=()=>{

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

        <div className="settingsPage" id={theme.mode} >

<h1 className="settingsPageTitle"><PeopleAltOutlinedIcon/> Account Settings</h1>

          <form className="settingsPageForm" id={theme.mode}>
            <div className="settingsPageItem">
              <label>Username</label>
              <input disabled={!isEdited} type="text" defaultValue={userSettings.name}  onChange={(e)=>setUserSettings({...userSettings, name:e.target.value})}/>
            </div>
            <div className="settingsPageItem">
              <label>Surname</label>
              <input disabled={!isEdited} type="text" defaultValue={userSettings.surname} onChange={(e)=>setUserSettings({...userSettings, surname:e.target.value})}/>
            </div>
            <div className="settingsPageItem">
              <label>Email</label>
              <input disabled={!isEdited} type="email" defaultValue={userSettings.email} onChange={(e)=>setUserSettings({...userSettings, email:e.target.value})} />
            </div>
        
            <div className="settingsPageItem">
              <label>Phone</label>
              <input disabled={!isEdited} type="number" defaultValue={userSettings.phone} onChange={(e)=>setUserSettings({...userSettings, phone:e.target.value})}/>
            </div>
            <div className="settingsPageItem">
              <label>Adress</label>
              <input disabled={!isEdited} type="text" defaultValue={userSettings.adress} onChange={(e)=>setUserSettings({...userSettings, adress:e.target.value})} />
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
                <input disabled={true} type="radio" name="gender" id="male" value="male" checked={userSettings.gender==='male'} />
                <label for="male">Male</label>
                <input disabled={true} type="radio" name="gender" id="female" value="female" checked={userSettings.gender==='female'} />
                <label for="female">Female</label>
             
              </div>
            </div>
            <div className="settingsPageItem-inputFile">
              <label>change photo</label>
          <input type="file" 
          onChange={(e) => setSelectedFile(e.target.files[0])}
          />
          <button onClick={uploadUserAvatar}>Save</button>
            </div>
            <div className="settingsPageButtonContainer">
            {isEdited?(<button className="settingsPageButton" onClick={updateUserData}>Update</button>):
            (<button onClick={(e)=>{e.preventDefault();setIsEdited(true)}} className="settingsPageButton">Edit</button>)}
            </div>
          </form>
        </div>
    )
}