import './widgetLarge.css';

const WidgetLarge=()=>{

const Button=({type})=>{
    return(
        <button className={`widgetLargeButon ${type}`}>{type}</button>
    )
}

    return(
        <div className="widgetLarge">
         
         <h3 className="widgetLargeTitle">Latest transactions</h3>
<table className="widgetLargeTable">
    <tr className="widgetLargeTr">
        <th className="widgetLargeTh">Customer</th>
        <th className="widgetLargeTh">Date</th>
        <th className="widgetLargeTh">Amount</th>
        <th className="widgetLargeTh">Status</th>
    </tr>
    <tr className="widgetLargeTable">
        <td className="widgetLargeUser">
            <img src="public/img/person2.jpg" alt="" className="widgetLargeImg" />
            <span className="widgetLargeName">Susan Carol</span>
        </td>
        <td className="widgetLargeDate">2 Jan 2023</td>
        <td className="widgetLargeAmount">$150</td>
        <td className="widgetLargeStatus"><Button type='Approved'/></td>
    </tr> <tr className="widgetLargeTr">
        <th className="widgetLargeTh">Customer</th>
        <th className="widgetLargeTh">Date</th>
        <th className="widgetLargeTh">Amount</th>
        <th className="widgetLargeTh">Status</th>
    </tr>
    <tr className="widgetLargeTable">
        <td className="widgetLargeUser">
            <img src="public/img/person2.jpg" alt="" className="widgetLargeImg" />
            <span className="widgetLargeName">Susan Carol</span>
        </td>
        <td className="widgetLargeDate">2 Jan 2023</td>
        <td className="widgetLargeAmount">$150</td>
        <td className="widgetLargeStatus"><Button type='Decline'/></td>
    </tr> <tr className="widgetLargeTr">
        <th className="widgetLargeTh">Customer</th>
        <th className="widgetLargeTh">Date</th>
        <th className="widgetLargeTh">Amount</th>
        <th className="widgetLargeTh">Status</th>
    </tr>
    <tr className="widgetLargeTable">
        <td className="widgetLargeUser">
            <img src="public/img/person2.jpg" alt="" className="widgetLargeImg" />
            <span className="widgetLargeName">Susan Carol</span>
        </td>
        <td className="widgetLargeDate">2 Jan 2023</td>
        <td className="widgetLargeAmount">$150</td>
        <td className="widgetLargeStatus"><Button type='Pending'/></td>
    </tr> <tr className="widgetLargeTr">
        <th className="widgetLargeTh">Customer</th>
        <th className="widgetLargeTh">Date</th>
        <th className="widgetLargeTh">Amount</th>
        <th className="widgetLargeTh">Status</th>
    </tr>
    <tr className="widgetLargeTable">
        <td className="widgetLargeUser">
            <img src="public/img/person2.jpg" alt="" className="widgetLargeImg" />
            <span className="widgetLargeName">Susan Carol</span>
        </td>
        <td className="widgetLargeDate">2 Jan 2023</td>
        <td className="widgetLargeAmount">$150</td>
        <td className="widgetLargeStatus"><Button type='Approved'/></td>
    </tr>
</table>
        </div>
    )
}

export default WidgetLarge;