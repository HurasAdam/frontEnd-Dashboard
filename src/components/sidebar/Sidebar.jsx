import "./sidebar.css";
import AppsIcon from "@mui/icons-material/Apps";
import TimelineIcon from '@mui/icons-material/Timeline';

import AssessmentIcon from '@mui/icons-material/Assessment';
import StyleOutlinedIcon from '@mui/icons-material/StyleOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext, AuthContextProvider } from "../../contexts/AuthContext";
const Sidebar = () => {
  const {user,dispatch}=useContext(AuthContext)
const [isHidden,setIsHidden]=useState(true)

const handleClick=()=>{

  localStorage.removeItem('user')
  dispatch({type:"LOGOUT",payload:null})

}


  
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
           <Link className="sidebarLink" to='/projects'> <li className="sidebar-list-item">
              <TimelineIcon className="sidebarIcon" />
              Projects
            </li></Link>
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
            
            {user.role==='admin'?(
      
       <li className="sidebar-list-item-submenu" >
           <div className="submenuItem" onClick={()=>setIsHidden(!isHidden)}>
           <AdminPanelSettingsOutlinedIcon className="sidebarIcon"/>
           Admin Panel
           </div>
       
              <ul>   
          
             
              <Link to='/manageRoles'className="sidebarLink">
                <li hidden={isHidden}>
                Manage Roles
                </li>
                </Link>
                <Link to='/manageUsers' className="sidebarLink">
                <li hidden={isHidden}>
                Manage Users
                </li>
                </Link>
              </ul>
              </li>
          
           
           ):null}
            <Link to='/settings' className="sidebarLink">
            <li className="sidebar-list-item">
              <SettingsOutlinedIcon className="sidebarIcon"/>
              Settings
            </li>
            </Link>
            <li className="sidebar-list-item" onClick={handleClick}>
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
