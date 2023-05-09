import "./settingsPage.css";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { useFetch } from "../../hooks/useFetch";
import {ProfileSettings} from '../profileSettings/ProfileSettings';
import {AccountSettings} from '../accountSettings/AccountSettings';
import { useState } from "react";

export const SettingsPage = () => {
  const [toggleSection,setToggleSection]=useState(false);
  const [data, isLoading, error] = useFetch(
    "http://127.0.0.1:3000/api/user?settings=user"
  );

  const toggleForm= ()=>{
setToggleSection(!toggleSection)
  }

  const updateUserData=async(e)=>{
    e.preventDefault()
        const response = await fetch(`http://127.0.0.1:3000/api/user/`,{
            method:"PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
              },
              body: JSON.stringify({
                name:userSettings.name,
                surname:userSettings.surname
              }),
            
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
  }
    };
  

  return (
    <div className="settingsPage">
      <nav>
       
          <button disabled={!toggleSection?true:false} className="settingsNavLink" onClick={toggleForm}>
            <PermIdentityOutlinedIcon className="settingsPageIcon" />
            Profile
          </button>

          <button disabled={toggleSection?true:false} className="settingsNavLink" onClick={toggleForm}>
            <SettingsOutlinedIcon />
            Account
          </button>
       
      </nav>
{!toggleSection?(<ProfileSettings updateUserData={updateUserData} uploadUserAvatar={uploadUserAvatar}/> ):
(<AccountSettings updateUserData={updateUserData}/>)}
    </div>
  );
};
