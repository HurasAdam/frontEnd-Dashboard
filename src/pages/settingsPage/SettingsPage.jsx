import "./settingsPage.css";
import { NavLink, Outlet } from "react-router-dom";
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
export const SettingsPage = () => {
  return (
    <div className="settingsPage">
      <nav>
        <ul>
        <NavLink className='settingsNavLink' to='profile' isactive={(match, location) => {
            return location.pathname.startsWith("/settings/profile");
          }}>
          <li>
            <PermIdentityOutlinedIcon className="settingsPageIcon"/>
            Profile
          </li>
          </NavLink>
          <NavLink className='settingsNavLink'  to='account' isactive={(match, location) => {
            return location.pathname.startsWith("/settings/profile");
          }}>
            <li>
              <SettingsOutlinedIcon/>
              Account</li>
          </NavLink>
          
        </ul>
      </nav>
      <Outlet></Outlet>
    </div>
  );
};
