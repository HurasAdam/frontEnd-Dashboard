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
         <ResponsiveContainer width='100%' aspect={4/1}>
            <LineChart data={data}>
                <XAxis dataKey='name' stroke='#5550bd'/>
                <YAxis dataKey={dataKey} type="number"/ >
                <Line type='monotone' dataKey={dataKey} stroke='red'/>
                <Line type='monotone' dataKey={dataKey2} stroke='#5550bd'/>
                <Line type='monotone' dataKey={dataKey3} stroke='green'/>
                <Tooltip/>
                {grid&&<CartesianGrid stroke='#DFE5EB' strokeDasharray="5 5"/>}
            </LineChart>
         </ResponsiveContainer>
        </div>
    )
}
export default Chart;