import "./settingsPage.css";
import { NavLink, Outlet } from "react-router-dom";
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { useFetch } from "../../hooks/useFetch";

export const SettingsPage = () => {

  const [data,isLoading,error]=useFetch('http://127.0.0.1:3000/api/user?settings=user')

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
