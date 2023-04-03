import "./user.css";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CallIcon from "@mui/icons-material/Call";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PublishIcon from "@mui/icons-material/Publish";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

export const User = ({isEditLocked}) => {
  const { userId } = useParams();
  const {user}=useContext(AuthContext)
  const [data, error, isLoading] = useFetch(
    `http://127.0.0.1:3000/api/user/${userId}`
  );




  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
        <Link to="/newUser">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            {data && (
              <img src={data.userAvatar} alt="" className="userShowImg" />
            )}
            <div className="userShowTopTitle">
              {data && <span className="userShowUsername">{data.name}</span>}
              {data && <span className="userShowJobTitle">{data.role}</span>}
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              
              <PermIdentityIcon className="userShowIcon" />
              <span>Role</span>
              {data&&<span className="userShowInfoTitle">{data.role}</span>}
            </div>

         
            <div className="userShowInfo">
              <CalendarMonthIcon className="userShowIcon" />
              {data && <span className="userShowInfoTitle">{`${data.createdAt.Day}/${data.createdAt.Month}/${data.createdAt.Year}`}</span>}
            </div>
            <div className="userShowInfo">
              <CallIcon className="userShowIcon" />
              {data && <span className="userShowInfoTitle">{data.email}</span>}
            </div>
            <div className="userShowInfo">
              <MailOutlineIcon className="userShowIcon" />
              {data && <span className="userShowInfoTitle">{data.email}</span>}
            </div>
            <div className="userShowInfo">
              <LocationOnIcon className="userShowIcon" />
              {data && <span className="userShowInfoTitle">{data.adress}</span>}
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form action="" className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label htmlFor="">Username</label>
                {data && (
                  <input
                    type="text"
                    placeholder={data.name}
                    className="userUpdateInput"
                  />
                )}
              </div>
              <div className="userUpdateItem">
                <label htmlFor="">Full Name</label>
                {data && (
                  <input
                    type="text"
                    placeholder={data.surname}
                    className="userUpdateInput"
                  />
                )}
              </div>
              <div className="userUpdateItem">
                <label htmlFor="">Email</label>
                {data && (
                  <input
                    type="text"
                    placeholder={data.email}
                    className="userUpdateInput"
                  />
                )}
              </div>
              <div className="userUpdateItem">
                <label htmlFor="">Phone</label>
                {data && (
                  <input
                    type="text"
                    placeholder={data.email}
                    className="userUpdateInput"
                  />
                )}
              </div>
              <div className="userUpdateItem">
                <label htmlFor="">Adress</label>
                {data && (
                  <input
                    type="text"
                    placeholder={data.email}
                    className="userUpdateInput"
                  />
                )}
              </div>
            </div>
            {user.role==='admin'?
            (<div className="userUpdateRight">
              {isEditLocked&&<div  className="userUpdateUpload">
                <span> Update photo</span>
                <label htmlFor="file">
                  <PublishIcon className="userUpdateIcon" />
                </label>
                <input   type="file" id="file" />
              </div>}
              <button hidden={!isEditLocked} className="userUpdateButton">Update</button>
            </div>):
            (<span>xd</span>)}
          </form>
        </div>
      </div>
    </div>
  );
};
