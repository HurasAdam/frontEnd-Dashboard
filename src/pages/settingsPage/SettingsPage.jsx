import "./settingsPage.css";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { useFetch } from "../../hooks/useFetch";
import { ProfileSettings } from "../profileSettings/ProfileSettings";
import { AccountSettings } from "../accountSettings/AccountSettings";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export const SettingsPage = () => {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState({
    data: {},
    userCredentials: {
      email: {
        newEmail: "",
        repeatNewEmail: "",
      },
      password: {
        currentPassword: "",
        newPassword: "",
        repeatNewPassword: "",
      },
    },
  });



  const triggerCredentials=(credential,key,e)=>{

    setUserData({...userData,userCredentials:
      {...userData.userCredentials,[credential]:{...userData.userCredentials[credential],[key]:e}}})

  }

  const fire= (e,credential)=>{

try{

 if(userData.userCredentials.email.newEmail!==userData.userCredentials.email.repeatNewEmail){
  throw Error('new email and repeated email are not the same')
 }
 console.log('gitara')



}
catch(Error){
console.log(erro)
}
  }

  const [toggleSection, setToggleSection] = useState(false);
  const [data, isLoading, error] = useFetch(
    "http://127.0.0.1:3000/api/user?settings=user"
  );

  useEffect(() => {
    data && setUserData({ ...userData, data: data });
  }, [data]);

  const handleInputUpdate = (prop, e) => {
    setUserData({ ...userData, data: { ...userData.data, [prop]: e } });
  };

  const trigger = async (e) => {
    e.preventDefault();

    const newData = {};
    for (const key in userData.data) {
      if (userData.data[key] !== data[key]) {
        newData[key] = userData.data[key];
      }
    }

    const response = await fetch(`http://127.0.0.1:3000/api/user/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(newData),
    });
  };

  const toggleForm = () => {
    setToggleSection(!toggleSection);
  };

  // const updateUserData = async (e) => {
  //   e.preventDefault();
  //   const response = await fetch(`http://127.0.0.1:3000/api/user/`, {
  //     method: "PATCH",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${user.token}`,
  //     },
  //     body: JSON.stringify({
  //       name: userSettings.name,
  //       surname: userSettings.surname,
  //     }),
  //   });
  //   if (response.ok) {
  //     setIsEdited(false);
  //   }
  // };

  const uploadUserAvatar = async (e) => {
    e.preventDefault();
    const file = new FormData();
    file.append("file", selectedFile);

    const response = await fetch(
      `http://127.0.0.1:3000/api/user/upload?id=${user.userId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        body: file,
      }
    );
    if (response.ok) {
      const json = await response.json();
      localStorage.setItem("userAvatar", json.data);
    }
  };

  return (
    <div className="settingsPage">
      <nav>
        <button
          disabled={!toggleSection ? true : false}
          className="settingsNavLink"
          onClick={toggleForm}
        >
          <PermIdentityOutlinedIcon className="settingsPageIcon" />
          Profile
        </button>

        <button
          disabled={toggleSection ? true : false}
          className="settingsNavLink"
          onClick={toggleForm}
        >
          <SettingsOutlinedIcon />
          Account
        </button>
      </nav>
      {!toggleSection ? (
        <ProfileSettings
          trigger={trigger}
          handleInputUpdate={handleInputUpdate}
          data={data}
       
          uploadUserAvatar={uploadUserAvatar}
        />
      ) : (
        <AccountSettings  triggerCredentials={triggerCredentials} fire={fire} />
      )}
    </div>
  );
};
