import './widgetSmall.css';
import VisibilityIcon from '@mui/icons-material/Visibility';

const WidgetSmall=()=>{
    return(
        <div className="widgetSmall">
            <span className="widgetSmallTitle">New Members</span>
            <ul className="widgetSmallList">
                <li className="widgetSmallItem">
                    <img src='public/img/person1.jpg' className="widgetSmallImg" />
                <div className="widgetSmallUser">
                    <span className="userSmallUsername">Nicolas Larrson</span>
                    <span className="userSmallJobTitle">Software Engineer</span>
                </div>
                <button className="widgetSmallButton">
                    <VisibilityIcon className='widgetSmallIcon'/>
                    Display
                </button>
                </li>
                <li className="widgetSmallItem">
                    <img src='public/img/person1.jpg' className="widgetSmallImg" />
                <div className="widgetSmallUser">
                    <span className="userSmallUsername">Nicolas Larrson</span>
                    <span className="userSmallJobTitle">Software Engineer</span>
                </div>
                <button className="widgetSmallButton">
                    <VisibilityIcon className='widgetSmallIcon'/>
                    Display
                </button>
                </li>
                <li className="widgetSmallItem">
                    <img src='public/img/person1.jpg' className="widgetSmallImg" />
                <div className="widgetSmallUser">
                    <span className="userSmallUsername">Nicolas Larrson</span>
                    <span className="userSmallJobTitle">Software Engineer</span>
                </div>
                <button className="widgetSmallButton">
                    <VisibilityIcon className='widgetSmallIcon'/>
                    Display
                </button>
                </li>
                <li className="widgetSmallItem">
                    <img src='public/img/person1.jpg' className="widgetSmallImg" />
                <div className="widgetSmallUser">
                    <span className="userSmallUsername">Nicolas Larrson</span>
                    <span className="userSmallJobTitle">Software Engineer</span>
                </div>
                <button className="widgetSmallButton">
                    <VisibilityIcon className='widgetSmallIcon'/>
                    Display
                </button>
                </li>
                <li className="widgetSmallItem">
                    <img src='public/img/person1.jpg' className="widgetSmallImg" />
                <div className="widgetSmallUser">
                    <span className="userSmallUsername">Nicolas Larrson</span>
                    <span className="userSmallJobTitle">Software Engineer</span>
                </div>
                <button className="widgetSmallButton">
                    <VisibilityIcon className='widgetSmallIcon'/>
                    Display
                </button>
                </li>
            </ul>
        </div>
    )
}

export default WidgetSmall;