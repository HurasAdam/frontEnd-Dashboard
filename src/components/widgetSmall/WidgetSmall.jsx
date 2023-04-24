import './widgetSmall.css';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { ThemeContext } from '../../contexts/ThemeContext'
import { useContext } from 'react';
const WidgetSmall=()=>{
    const {theme}=useContext(ThemeContext)
    return(
        <div className="widgetSmall" id={theme.mode}>
            <span className="widgetSmallTitle">New Members</span>
            <ul className="widgetSmallList">
                <li className="widgetSmallItem">
                    <img src='public/img/person1.jpg' className="widgetSmallImg" />
                <div className="widgetSmallUser">
                    <span className="userSmallUsername">Nicolas Larrson</span>
                    <span id={theme.mode} className="userSmallJobTitle">Software Engineer</span>
                </div>
                <button id={theme.mode} className="widgetSmallButton">
                    <VisibilityIcon className='widgetSmallIcon'/>
                    Display
                </button>
                </li>
                <li className="widgetSmallItem">
                    <img src='public/img/person1.jpg' className="widgetSmallImg" />
                <div className="widgetSmallUser">
                    <span className="userSmallUsername">Nicolas Larrson</span>
                    <span id={theme.mode} className="userSmallJobTitle">Software Engineer</span>
                </div>
                <button id={theme.mode} className="widgetSmallButton">
                    <VisibilityIcon className='widgetSmallIcon'/>
                    Display
                </button>
                </li>
                <li className="widgetSmallItem">
                    <img src='public/img/person1.jpg' className="widgetSmallImg" />
                <div className="widgetSmallUser">
                    <span className="userSmallUsername">Nicolas Larrson</span>
                    <span id={theme.mode} className="userSmallJobTitle">Software Engineer</span>
                </div>
                <button id={theme.mode} className="widgetSmallButton">
                    <VisibilityIcon className='widgetSmallIcon'/>
                    Display
                </button>
                </li>
                <li className="widgetSmallItem">
                    <img src='public/img/person1.jpg' className="widgetSmallImg" />
                <div className="widgetSmallUser">
                    <span className="userSmallUsername">Nicolas Larrson</span>
                    <span id={theme.mode} className="userSmallJobTitle">Software Engineer</span>
                </div>
                <button id={theme.mode} className="widgetSmallButton">
                    <VisibilityIcon className='widgetSmallIcon'/>
                    Display
                </button>
                </li>
                <li className="widgetSmallItem">
                    <img src='public/img/person1.jpg' className="widgetSmallImg" />
                <div className="widgetSmallUser">
                    <span className="userSmallUsername">Nicolas Larrson</span>
                    <span id={theme.mode} className="userSmallJobTitle">Software Engineer</span>
                </div>
                <button id={theme.mode} className="widgetSmallButton">
                    <VisibilityIcon className='widgetSmallIcon'/>
                    Display
                </button>
                </li>
            </ul>
        </div>
    )
}

export default WidgetSmall;