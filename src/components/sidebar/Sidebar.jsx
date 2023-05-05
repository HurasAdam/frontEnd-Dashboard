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
import {ThemeContext} from "../../contexts/ThemeContext"
import { settLocalStorage } from "../../utils/SettlocalStorage";
const Sidebar = ({isMenuActive,setIsMenuActive}) => {
const {user,dispatch}=useContext(AuthContext)
const {theme,dispatch:themeSwitch}= useContext(ThemeContext)
const [isHidden,setIsHidden]=useState(true)


//HANDLE LOGOUT
const handleClick=()=>{
  setIsMenuActive(false)
  localStorage.clear()
  dispatch({type:"LOGOUT",payload:null})
}

const toggleTheme= ()=>{
  
  const mainTheme=theme.mode==='light'?'dark':'light'
  const mainColor = theme.color==='rgb(92, 92, 92)'?'rgb(230, 234, 237)':'rgb(92, 92, 92)'

  
  themeSwitch({type:"LIGHT",
  payload:{mode:mainTheme,color:mainColor}})
localStorage.setItem('mode',mainTheme)
localStorage.setItem('color',mainColor)
}

  
  return (
    <div className={`sidebar ${isMenuActive}`} id={theme.mode}>
     {user? <div className="sidebar-wrapper">
        <div className="sidebar-menu">
          <h3 className="sidebar-title" id={theme.mode}>Dashboard</h3>
          <ul className="sidebar-list">
            <Link to='/'className="sidebarLink">
            <li onClick={()=>setIsMenuActive(false)} id={theme.mode} className="sidebar-list-item active" style={{ color:`${theme.color}` }} >
              <AppsIcon  className="sidebarIcon"/>
              Home
            </li>
            </Link >
           <Link className="sidebarLink" to='/projects'> 
           <li onClick={()=>setIsMenuActive(false)} className="sidebar-list-item" style={{ color:`${theme.color}` }}>
              <TimelineIcon className="sidebarIcon" />
              Projects
            </li></Link>
            <Link to='/tickets' className="sidebarLink" >
            <li onClick={()=>setIsMenuActive(false)} className="sidebar-list-item" style={{ color:`${theme.color}` }}>
              <StyleOutlinedIcon className="sidebarIcon"/>
              Tickets
            </li>
            </Link>
            <Link to='/archive'>
            <li onClick={()=>setIsMenuActive(false)} className="sidebar-list-item " style={{ color:`${theme.color}` }}>
              <ReceiptLongOutlinedIcon className="sidebarIcon" 
              
              />
              Archive
             
            </li>
            </Link>
          </ul>
        </div>
        <div className="sidebar-menu">
          <h3 className="sidebar-title" id={theme.mode}>Quick Menu</h3>
          <ul className="sidebar-list">
          <Link to='/users' className="sidebarLink" 
          style={{ color:`${theme.color}` }}>
            <li onClick={()=>setIsMenuActive(false)} className="sidebar-list-item">
              <PeopleAltOutlinedIcon className="sidebarIcon" />
              Users
            </li>
            </Link >
            
            {user.role==='admin'?(
      
       <li className="sidebar-list-item-submenu"  style={{ color:`${theme.color}` }} >
           <div className="submenuItem" onClick={()=>setIsHidden(!isHidden)}>
           <AdminPanelSettingsOutlinedIcon className="sidebarIcon"/>
           Admin Panel
           </div>
       
              <ul>   
          
             
              <Link to='/manageRoles'className="sidebarLink">
                <li onClick={()=>setIsMenuActive(false)} hidden={isHidden}>
                Manage Roles
                </li>
                </Link>
                <Link to='/manageUsers' className="sidebarLink">
                <li onClick={()=>setIsMenuActive(false)} hidden={isHidden}>
                Manage Users
                </li>
                </Link>
              </ul>
              </li>
          
           
           ):null}
            <Link to='/settings/profile' className="sidebarLink">
            <li onClick={()=>setIsMenuActive(false)} className="sidebar-list-item"  style={{ color:`${theme.color}` }}>
              <SettingsOutlinedIcon className="sidebarIcon"/>
              Settings
            </li>
            </Link>
            <li className="sidebar-list-item" onClick={handleClick}  style={{ color:`${theme.color}`}}>
              <LogoutOutlinedIcon className="sidebarIcon"/>
              Logout
            </li>
          </ul>
          <button onClick={toggleTheme} >Theme</button>
        </div>
   
      </div>:null}
    </div>
  );
};
export default Sidebar;
