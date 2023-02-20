import "./user.css";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CallIcon from "@mui/icons-material/Call";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PublishIcon from '@mui/icons-material/Publish';
import { Link } from "react-router-dom";
import { useState } from "react";



export const User = ({userData}) => {

  
  return (
    <div className="user">
 {console.log(userData)}
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
        <Link to='/newUser'>
        <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src={`../${userData.avatar}`}
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{userData.userName}</span>
              <span className="userShowJobTitle">Software Engineer</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentityIcon className="userShowIcon" />
              <span className="userShowInfoTitle">Kowalski123</span>
            </div>

            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <CalendarMonthIcon className="userShowIcon" />
              <span className="userShowInfoTitle">{userData.birthday}</span>
            </div>
            <div className="userShowInfo">
              <CallIcon className="userShowIcon" />
              <span className="userShowInfoTitle">{userData.phone}</span>
            </div>
            <div className="userShowInfo">
              <MailOutlineIcon className="userShowIcon" />
              <span className="userShowInfoTitle">{userData.email}</span>
            </div>
            <div className="userShowInfo">
              <LocationOnIcon className="userShowIcon" />
              <span className="userShowInfoTitle">{userData.adress}</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
            <span className="userUpdateTitle">Edit</span>
            <form action="" className="userUpdateForm">
                <div className="userUpdateLeft">
                    <div className="userUpdateItem">
                        <label htmlFor="">Username</label>
                        <input type="text" placeholder={userData.userName} className='userUpdateInput' />
                    </div>
                    <div className="userUpdateItem">
                        <label htmlFor="">Full Name</label>
                        <input type="text" placeholder={userData.userName} className='userUpdateInput' />
                    </div>
                    <div className="userUpdateItem">
                        <label htmlFor="">Email</label>
                        <input type="text" placeholder={userData.email} className='userUpdateInput' />
                    </div>
                    <div className="userUpdateItem">
                        <label htmlFor="">Phone</label>
                        <input type="text" placeholder={userData.phone} className='userUpdateInput' />
                    </div>
                    <div className="userUpdateItem">
                        <label htmlFor="">Adress</label>
                        <input type="text" placeholder={userData.adress} className='userUpdateInput' />
                    </div>
                </div>
                <div className="userUpdateRight">
                    <div className="userUpdateUpload">
                        <img src={`../${userData.avatar}`} alt="" className='userUpdateImg' />
                        <label htmlFor="file">
                            <PublishIcon className="userUpdateIcon"/>
                        </label>
                        <input type="file" id='file'/>
                    </div>
                    <button className="userUpdateButton">Update</button>
                </div>
            </form>
        </div>
      </div>
    </div>
  );
};
