import "../circleChart/circleChart.css"
import { PieChart, Pie, Cell, ResponsiveContainer,Tooltip  } from "recharts";
import { ThemeContext } from '../../contexts/ThemeContext'
import { useContext } from "react";
export const CircleChart=({data,title})=>{

const {theme}=useContext(ThemeContext)
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

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
    
    console.log(data)
    return (
        <div className="circleChart" id={theme.mode}>
      <h3 className='chartTitle'>{title} </h3 >
      <div className="legendContainer">
      {data.map((tile)=>{
    return(<div style={{ color:`${tile.color}` }} className="pieChartLegendTile">{tile.name}</div>)
  })}
      </div>

        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={200} height={200}>
            <Pie
            isAnimationActive={true}
              data={data}
              cx='60%'
              cy='50%'
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={128}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip/>
          </PieChart>
        </ResponsiveContainer>
        </div>
      );

}