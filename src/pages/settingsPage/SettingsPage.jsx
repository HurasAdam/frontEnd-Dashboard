import "./settingsPage.css";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { useFetch } from "../../hooks/useFetch";
import { ProfileSettings } from "../profileSettings/ProfileSettings";
import { AccountSettings } from "../accountSettings/AccountSettings";
import { getUserProfile, removeAvatar } from "../../features/userApi/userApi";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useQuery } from "react-query";

export const SettingsPage = () => {
  const [toggleSection, setToggleSection] = useState(false);
const [userFrom,setUserForm]=useState({})



  const {
    isLoading,
    isError,
    error,
    data: userData,
  } = useQuery(["userData"], getUserProfile, {
onSuccess:({userProfile})=>setUserForm(userProfile),
refetchOnWindowFocus: false,
  });




  const toggleForm = () => {
    setToggleSection(!toggleSection);
  };



  return (
    <div className="settingsPage">
      <nav>
        <button
          disabled={!toggleSection ? true : false}
          className={`settingsNavLink ${!toggleSection?'active':''}`}
          onClick={toggleForm}
        >
          <PermIdentityOutlinedIcon className="settingsPageIcon" />
          Profile
        </button>

        <button
          disabled={toggleSection ? true : false}
          className={`settingsNavLink ${toggleSection?'active':''}`}
          onClick={toggleForm}
        >
          <SettingsOutlinedIcon />
          Account
        </button>
      </nav>
      {!toggleSection ? (
        <ProfileSettings
        userData={userData}
        setUserForm={setUserForm}
        userFrom={userFrom}
        />
      ) : (
        <AccountSettings 
        email={userData?.userProfile?.email}

        />
      )}
    </div>
  );
};
