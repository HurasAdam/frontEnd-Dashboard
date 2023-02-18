import "./sidebar.css";
import AppsIcon from "@mui/icons-material/Apps";
import TimelineIcon from '@mui/icons-material/Timeline';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import InventoryIcon from '@mui/icons-material/Inventory';
import PaidIcon from '@mui/icons-material/Paid';
import AssessmentIcon from '@mui/icons-material/Assessment';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import WorkIcon from '@mui/icons-material/Work';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import ReportIcon from '@mui/icons-material/Report';
import { Link } from "react-router-dom";
const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-wrapper">
        <div className="sidebar-menu">
          <h3 className="sidebar-title">Dashboard</h3>
          <ul className="sidebar-list">
            <li className="sidebar-list-item active">
              <AppsIcon className="sidebarIcon"/>
              Home
            </li>
            <li className="sidebar-list-item">
              <TimelineIcon className="sidebarIcon" />
              Analytics
            </li>
            <li className="sidebar-list-item">
              <WhatshotIcon className="sidebarIcon"/>
              Sales
            </li>
          </ul>
        </div>
        <div className="sidebar-menu">
          <h3 className="sidebar-title">Quick Menu</h3>
          <ul className="sidebar-list">
            <Link to='/users'>
            <li className="sidebar-list-item ">
              <PeopleAltIcon className="sidebarIcon"/>
              Users
             
            </li>
            </Link>
            <li className="sidebar-list-item">
              <InventoryIcon className="sidebarIcon" />
              Products
            </li>
            <li className="sidebar-list-item">
              <PaidIcon className="sidebarIcon"/>
              Transactions
            </li>
            <li className="sidebar-list-item">
              <AssessmentIcon className="sidebarIcon"/>
              Reports
            </li>
          </ul>
        </div>
        <div className="sidebar-menu">
          <h3 className="sidebar-title">Notifications</h3>
          <ul className="sidebar-list">
            <li className="sidebar-list-item ">
              <MailOutlineIcon className="sidebarIcon"/>
              Mail
            </li>
            <li className="sidebar-list-item">
              <QuestionAnswerIcon className="sidebarIcon" />
              Feedback
            </li>
            <li className="sidebar-list-item">
              <ChatBubbleOutlineIcon className="sidebarIcon"/>
              Messages
            </li>
          </ul>
        </div>
        <div className="sidebar-menu">
          <h3 className="sidebar-title">Staff</h3>
          <ul className="sidebar-list">
            <li className="sidebar-list-item ">
              <WorkIcon className="sidebarIcon"/>
              Manage
            </li>
            <li className="sidebar-list-item">
              <AutoGraphIcon className="sidebarIcon" />
              Analytics
            </li>
            <li className="sidebar-list-item">
              <ReportIcon className="sidebarIcon"/>
              Reports
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
