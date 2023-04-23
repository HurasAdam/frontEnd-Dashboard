import './widgetLarge.css';
import {ThemeContext} from '../../contexts/ThemeContext'
import { useContext } from 'react';
const WidgetLarge=()=>{

    const {theme}=useContext(ThemeContext)
const Button=({type})=>{
    return(
        <button className={`widgetLargeButon ${type}`}>{type}</button>
    )
}

    return(
        <div className="widgetLarge" id={theme.mode}>
         
         <h3 className="widgetLargeTitle">Latest transactions</h3>
<table className="widgetLargeTable">
<tbody>
    <tr className="widgetLargeTr">
        <th className="widgetLargeTh">User</th>
        <th className="widgetLargeTh">Date</th>
        <th className="widgetLargeTh">Type</th>
        <th className="widgetLargeTh">Priority</th>
    </tr>
    <tr className="widgetLargeTr">
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
</table>
        </div>
    )
}

export default WidgetLarge;