import './widgetLarge.css';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import {ThemeContext} from '../../contexts/ThemeContext'
import { useContext } from 'react';
const WidgetLarge=({data})=>{
console.log(data)
    const {theme}=useContext(ThemeContext)
const Button=({type})=>{
    return(
        <button className={`widgetLargeButon ${type}`}>{type}</button>
    )
}

    return(
        <div className="widgetLarge" id={theme.mode}>
         
         

{data?.LastAdded.map((row)=>{
    return(<div className='tableRow'>
        <div className='rowTitle'><span >{row.title}</span></div>
        <div className='rowProprsContainer'><div className='rowType'><span className={row.type} >{row.type}</span></div>
        <div className='rowPriority'><span className={row.priority} >{row.priority}</span></div>
        <div className='rowAction'><VisibilityOutlinedIcon className='rowAction-icon' ></VisibilityOutlinedIcon></div>
        </div>
    </div>)
   
})}
<h3 className="widgetLargeTitle">Latest transactions</h3>
{/* <table className="widgetLarge-Table">
<tbody>
    <tr className="widgetLargeTable-Header">
        <th className="widgetLargeTh">User</th>
        <th className="widgetLargeTh">Date</th>
        <th className="widgetLargeTh">Type</th>
        <th className="widgetLargeTh">Priority</th>
    </tr>
    <tr className="widgetLargeTable">
        <td className="widgetLargeUser">
            <img src="public/img/person2.jpg" alt="" className="widgetLargeImg" />
            <span className="widgetLargeName">Susan Carol</span>
        </td>
        <td className="widgetLargeDate">2 Jan 2023</td>
        <td className="widgetLargeAmount">enhancement</td>
        <td className="widgetLargeStatus"><Button type='Low'/></td>
 </tr>
    <tr className="widgetLargeTable">
        <td className="widgetLargeUser">
            <img src="public/img/person2.jpg" alt="" className="widgetLargeImg" />
            <span className="widgetLargeName">Susan Carol</span>
        </td>
        <td className="widgetLargeDate">2 Jan 2023</td>
        <td className="widgetLargeAmount">Bug</td>
        <td className="widgetLargeStatus"><Button type='High'/></td>
    </tr>
    <tr className="widgetLargeTable">
        <td className="widgetLargeUser">
            <img src="public/img/person2.jpg" alt="" className="widgetLargeImg" />
            <span className="widgetLargeName">Susan Carol</span>
        </td>
        <td className="widgetLargeDate">2 Jan 2023</td>
        <td className="widgetLargeAmount">Question</td>
        <td className="widgetLargeStatus"><Button type='Medium'/></td>
    </tr> 
    <tr className="widgetLargeTable">
        <td className="widgetLargeUser">
            <img src="public/img/person2.jpg" alt="" className="widgetLargeImg" />
            <span className="widgetLargeName">Susan Carol</span>
        </td>
        <td className="widgetLargeDate">2 Jan 2023</td>
        <td className="widgetLargeAmount">Bug</td>
        <td className="widgetLargeStatus"><Button type='Approved'/></td>
    </tr>
    </tbody>
</table> */}
        </div>
    )
}

export default WidgetLarge;