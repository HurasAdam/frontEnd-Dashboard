import "./sidebar.css";
import AppsIcon from "@mui/icons-material/Apps";
import TimelineIcon from '@mui/icons-material/Timeline';

import AssessmentIcon from '@mui/icons-material/Assessment';
import StyleOutlinedIcon from '@mui/icons-material/StyleOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
const Sidebar = () => {

const {user}=useContext(AuthContext)
  
  return (
    <div className="sidebar">
     {user? <div className="sidebar-wrapper">
        <div className="sidebar-menu">
          <h3 className="sidebar-title">Dashboard</h3>
          <ul className="sidebar-list">
            <Link to='/'className="sidebarLink" >
            <li className="sidebar-list-item active">
              <AppsIcon className="sidebarIcon"/>
              Home
            </li>
            </Link >
            <li className="sidebar-list-item">
              <TimelineIcon className="sidebarIcon" />
              Projects
            </li>
            <Link to='/tickets' className="sidebarLink">
            <li className="sidebar-list-item">
              <StyleOutlinedIcon className="sidebarIcon"/>
              Tickets
            </li>
            </Link>
            <li className="sidebar-list-item ">
              <ReceiptLongOutlinedIcon className="sidebarIcon"/>
              My tickets
             
            </li>
           
          </ul>
        </div>
        <div className="sidebar-menu">
          <h3 className="sidebar-title">Quick Menu</h3>
          <ul className="sidebar-list">
          <Link to='/users' className="sidebarLink">
            <li className="sidebar-list-item">
              <PeopleAltOutlinedIcon className="sidebarIcon" />
              Users
            </li>
            </Link >
            <li className="sidebar-list-item">
              <SettingsOutlinedIcon className="sidebarIcon"/>
              Settings
            </li>
            <li className="sidebar-list-item">
              <LogoutOutlinedIcon className="sidebarIcon"/>
              Logout
            </li>
          </ul>
        </div>
   
      </div>:null}
    </div>
  );
};
export default Sidebar;
