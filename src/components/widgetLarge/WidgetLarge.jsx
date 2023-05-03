import './widgetLarge.css';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import {ThemeContext} from '../../contexts/ThemeContext'
import { useContext } from 'react';
import missingData from "../../../public/img/empty.png";
const WidgetLarge=({data})=>{

const {theme}=useContext(ThemeContext)

console.log(data)
const calculateTimeDifference = (date) => {
    const difference = new Date() - new Date(date);
    const units = {
      day: 24 * 60 * 60 * 1000,
      hour: 60 * 60 * 1000,
      minute: 60 * 1000,
      second: 1000,
    };
    for (const [unit, value] of Object.entries(units)) {
      const count = Math.floor(difference / value);
      if (count > 0) {
        return `${count} ${unit}${count > 1 ? 's' : ''} ago`;
      }
    }
    return 'just now';
  };  


    return(
        <div  id={theme.mode} className={`widgetLarge ${data?.LastAdded.length>0?'':'hidden'}`}>
<h3 className="widgetLargeTitle">Latest reports</h3>
{data?.LastAdded.length?(
data?.LastAdded.map((row)=>{
    return(<div className='tableRow'>
        <div className='rowTitle'><span >{row.title}</span></div>
        <div className='rowCreatedAt'><span>{calculateTimeDifference(row.createdAt)}</span></div>
        <div className='rowProprsContainer'><div className='rowType'><span className={row.type} >{row.type}</span></div>
        <div className='rowPriority'><span className={row.priority} >{row.priority}</span></div>
        <div className='rowAction'><VisibilityOutlinedIcon className='rowAction-icon' ></VisibilityOutlinedIcon></div>
        </div>
    </div>)
   
})):<div className='widgetLarge-missingDataPlaceholderWrapper'>
    
    <div className="widgetLarge-missingaDataImgWrapper">
            <img
              className="widgetLarge-missingDataPlaceholderImg"
              src={missingData}
              alt=""
            />
          </div>
          <div className='widgetLarge-missingaDataTxtWrapper'>
            <span>No rows...</span>
          </div>
    
    </div>}

        </div>
    )
}

export default WidgetLarge;