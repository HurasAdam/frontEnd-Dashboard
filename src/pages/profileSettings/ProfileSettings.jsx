import "./profileSettings.css";
import { useFetch } from "../../hooks/useFetch";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { settLocalStorage } from "../../utils/SettlocalStorage";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { ThemeContext } from "../../contexts/ThemeContext";
import { Link, Outlet } from "react-router-dom";
import { useQuery, useQueryClient } from "react-query";
import { getUserProfile, removeAvatar } from "../../features/userApi/userApi";
import { Tooltip } from "react-tooltip";
import { handleUploadAvatar } from "../../shared/handleUploadAvatar";
import { mutationHandler } from "../../shared/mutationHandler";
import { uploadAvatar } from "../../features/userApi/userApi";
import { handleRemoveAvatar } from "../../shared/handleRemoveAvatar";
export const ProfileSettings = ({
  updateUserData,
  uploadUserAvatar,
  data,
  handleInputUpdate,
  trigger,
}) => {



  const {
    isLoading,
    isError,
    error,
    data: userData,
  } = useQuery(["userData"], getUserProfile, {
    onSuccess: (data) => console.log(data),
  });



const queryClient= useQueryClient()

  const [userSettings, setUserSettings] = useState({});
  const [selectedFile, setSelectedFile] = useState();
  const [isEdited, setIsEdited] = useState(false);
  const { user,dispatch } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const [checker, setChecker] = useState({});

  const updateAvatarMutation = mutationHandler(uploadAvatar,(data)=>{

    const newUserAvatar= localStorage.setItem('userAvatar',data.data);
    dispatch({type:"UPDATE_AVATAR",payload:data.data});
    queryClient.invalidateQueries(["userData"])
  })

  const removeAvatarMutation = mutationHandler(removeAvatar,(data)=>{
    const newUserAvatar= localStorage.setItem('userAvatar',data.data);
    dispatch({type:"UPDATE_AVATAR",payload:data.data});
    queryClient.invalidateQueries(["userData"])
    
  })



  return (
    <div className="profileSettings" id={theme.mode}>
      <Tooltip id="xd" anchorSelect=".projectMember-avatar" multiline={true} />

      <span className="profileSettingsTitle">Profile Settings</span>

      <form className="profileSettingsForm" id={theme.mode}>
        <div className="user-details-form">
     
          <div className="form-section-header">
           <div className="form-section-header-txt">
           <span>User details</span>
            <span>put the user info in</span>
           </div>
       
      
          </div>

          <div className="form-section-details">
            <div className="user-avatar" data-tip={"xd"}>
              <span>{userData?.userProfile.role}</span>
             
              <CloseOutlinedIcon className="removeAvatar-button"onClick={(e)=>handleRemoveAvatar(e,removeAvatarMutation)} />
              <img
                src={
                  userData?.userProfile?.userAvatar?.url
                    ? userData.userProfile.userAvatar.url
                    : "/public/img/defaultUserAvatar.png"
                }
                alt=""
              />
              <div className="form-section-avatar">
              <input
                onChange={(e) => setSelectedFile(e.target.files[0])}
                type="file"
              />
              <button onClick={(e)=>handleUploadAvatar(e,selectedFile,updateAvatarMutation)}>Save</button>
              {selectedFile?<button onClick={(e)=>setSelectedFile('')}>X</button>:null}
              </div>
     
            </div>
            <div className="user-details-right">
              <div className="form-field">
                <label htmlFor="">First Name</label>
                <input type="text" value={userData?.userProfile.name} />
              </div>

              <div className="form-field">
                <label htmlFor="">Last Name</label>
                <input type="text" value={userData?.userProfile.surname} />
              </div>
            </div>
            <div className="user-details-left">
              <div className="form-field">
                <label htmlFor="gender">Gender</label>

                <select
                  name="gender"
                  id="gender"
                  value={userData?.userProfile.gender}
                >
                  <option value="male">male</option>
                  <option value="female">female</option>
                </select>
              </div>
              <div className="form-field">
                <label htmlFor="birthDate">BirthDay</label>
                <input
                  type="date"
                  id="birthDate"
                  value={userData?.userProfile.birthDay}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="user-relationships">
          <div className="relationships__form-section-header">
            <span>Relationships</span>
          </div>
          <div className="relationships-section-details">
            <div className="relationships__form-field">
              <label htmlFor="">Country</label>
              <input type="text" />
            </div>
            <div className="relationships__form-field">
              <label htmlFor="">City</label>
              <input type="text" />
            </div>
            <div className="relationships__form-field">
              <label htmlFor="">Phone</label>
              <input type="number" value={userData?.userProfile.phone} />
            </div>
          </div>
        </div>

        <div className="user-occupation-assigned">
          {userData?.projectListAsignedTo.map((project, projectIndex) => {
            return (
              <div
                className={`${
                  projectIndex % 2 ? "project-tile-even" : "project-tile-odd"
                }`}
              >
                <div className="project-tile-item">
                  <span>Project:</span>
                  {project.title}
                </div>

                <div className="projectMember-wrapper">
                  {project?.contributors.slice(0, 3).map((member) => {
                    return (
                      <div className="projectMember">
                        <img
                          className="projectMember-avatar"
                          src={
                            member.userAvatar.url
                              ? member.userAvatar.url
                              : "/public/img/defaultUserAvatar.png"
                          }
                          data-tooltip-html={project?.contributors
                            .map((member) => `${member.name} ${member.surname}`)
                            .join("<br/>")}
                          data-tooltip-variant="info"
                          data-tooltip-place="right"
                          place={"bottom-end"}
                          opacity={0.1}
                          data-tooltip-float={true}
                        ></img>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </form>
    </div>
  );
};
