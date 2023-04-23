import './chart.css'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
  } from "recharts";
import { ThemeContext } from '../../contexts/ThemeContext'
import { useContext } from 'react';
const Chart=({title,data,dataKey,grid,dataKey2,dataKey3})=>{
   const {theme}=useContext(ThemeContext)
    return(
        <div className="chart" id={theme.mode} style={{ color:`${theme.color}` }}>
         <h3 className='chartTitle'>{title} </h3 >
         <ResponsiveContainer width='100%' aspect={3/1}>
            <LineChart data={data}>
                <XAxis dataKey='name' stroke={theme.color}/>
                <YAxis dataKey={dataKey} type="number" stroke={theme.color}/>
                <Line type='monotone' dataKey={dataKey} stroke='rgb(205, 177, 187)'/>
                <Line type='monotone' dataKey={dataKey2} stroke='rgb(133, 137, 203)'/>
                <Line type='monotone' dataKey={dataKey3} stroke='rgb(58, 153, 127)'/>
                <Tooltip/>
                {grid&&<CartesianGrid stroke='' strokeDasharray="5 5"/>}
            </LineChart>
         </ResponsiveContainer>
        </div>
    )
}
export default Chart;