import "./topbar.css";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import LanguageIcon from "@mui/icons-material/Language";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
const Topbar = () => {
  return (
    <div className="topbar">
      <div className="topbar-wrapper">
        <div className="top-left">
          <span className="logo">IssueTracker</span>
        </div>
        <div className="top-right">
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
          <div className="topAvatar-container">
            <AccountCircleIcon fontSize="large" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Topbar;
