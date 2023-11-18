import "./profileSettings.css";
import { useFetch } from "../../hooks/useFetch";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { settLocalStorage } from "../../utils/SettlocalStorage";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import { ThemeContext } from "../../contexts/ThemeContext";
import { Link, Outlet } from "react-router-dom";
import { useQuery } from "react-query";
import { getUserProfile } from "../../features/userApi/userApi";
import { Tooltip } from "react-tooltip";
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
  const [userSettings, setUserSettings] = useState({});
  const [selectedFile, setSelectedFile] = useState();
  const [isEdited, setIsEdited] = useState(false);
  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const [checker, setChecker] = useState({});

  const test = userData?.projectListAsignedTo.map((project) => {
    return project.contributors;
  });
  console.log(userData);
  return (
    <div className="profileSettings" id={theme.mode}>
      <Tooltip id="xd" anchorSelect=".projectMember-avatar" multiline={true} />

      <span className="profileSettingsTitle">Profile Settings</span>

      <form className="profileSettingsForm" id={theme.mode}>
        <div className="user-details-form">
          <div className="form-section-header">
            <span>User details</span>
            <span>put the user info in</span>
          </div>

          <div className="form-section-details">
            <div className="user-avatar" data-tip={"xd"}>
              <span>{userData?.userProfile.role}</span>
              <img src={userData?.userProfile?.userAvatar?userData.userProfile.userAvatar:'/public/img/defaultUserAvatar.png'} alt="" />
              <input type="file" />
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
              <div className={`${projectIndex%2?"project-tile-even":"project-tile-odd"}`} >
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
                            member.userAvatar
                              ? member.userAvatar
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
