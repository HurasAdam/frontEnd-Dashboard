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

const Chart=({title,data,dataKey,grid})=>{
   
    return(
        <div className="chart">
         <h3 className='chartTitle'>{title}</h3>
         <ResponsiveContainer width='100%' aspect={4/1}>
            <LineChart data={data}>
                <XAxis dataKey='name' stroke='#5550bd'/>
                <YAxis dataKey='pv'/>
                <Line type='monotone' dataKey={dataKey}/>
                <Tooltip/>
                {grid&&<CartesianGrid stroke='#DFE5EB' strokeDasharray="5 5"/>}
            </LineChart>
         </ResponsiveContainer>
        </div>
    )
}
export default Chart;