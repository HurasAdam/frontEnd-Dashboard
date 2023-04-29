import "../circleChart/circleChart.css"
import { PieChart, Pie, Cell, ResponsiveContainer,Tooltip  } from "recharts";
import { ThemeContext } from '../../contexts/ThemeContext'
import { useContext, useEffect, useState } from "react";
export const CircleChart=({data,title,data2})=>{

const {theme}=useContext(ThemeContext)
const [chartData,setChartData]=useState()
const COLORS = chartData&&chartData.map((ob)=>ob.color)

useEffect(()=>{
    if(data){
  setChartData(data.map((ob)=>{
    return {...ob,color:`rgb(${getRandomNumber(0,255)},${getRandomNumber(0,255)},${getRandomNumber(0,255)})`}
}))
}
},[data])


function getRandomNumber(min, max){
  return Math.floor(Math.random()*(max-min+1)+min);
}

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    
    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
          {`${(percent * 100).toFixed(0)}%`}
        </text>
      );
    };
    
    return (
        <div className="circleChart" id={theme.mode}>
     
 

        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={200} height={200}>
            <Pie
            isAnimationActive={true}
              data={data}
              cx='60%'
              cy='50%'
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData&&chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip/>
          </PieChart>
        </ResponsiveContainer>
        </div>
      );

}