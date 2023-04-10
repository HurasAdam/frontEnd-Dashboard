import "./topbar.css";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import LanguageIcon from "@mui/icons-material/Language";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
const Topbar = () => {
const {user}=useContext(AuthContext)


  return (

    <div className="topbar">
      <div className="topbar-wrapper">
        <div className="top-left">
          <span className="logo">IssueTracker</span>
        </div>
        {user?<div className="top-right">
          <div className="topicons-container">
            <NotificationsNoneIcon />
            <span className="topicon-badge">2</span>
          </div>
          <div className="topicons-container">
            <LanguageIcon />
          </div>
          <div className="topicons-container">
            <SettingsIcon />
          </div>
          <div className="topicons-container">
            {user?<img  src={user.userAvatar}/>
            :<AccountCircleIcon fontSize="large" />
}
          </div>
        </div>:<div className="topbar-login">
          <Link className="loginLink" to='/login'><span>Login</span></Link>
          <Link className="loginLink" to='/signup'><span>Signup</span></Link>
          </div>}
      </div>
    </div>
  );
};
export default Topbar;
