import { useState } from "react";
import "./heatMapChart.css"
import ReactApexChart from "react-apexcharts";
export const HeatMapChart = () => {
  const [month, setMonth] = useState("");
  function getDaysInMonth(month) {
    let adjustedMonth;
    switch (month) {
      case "Januray":
        adjustedMonth = 0;
        break;
      case "February":
        adjustedMonth = 1;
        break;
      case "March":
        adjustedMonth = 2;
        break;
      case "April":
        adjustedMonth = 3;
        break;
      case "May":
        adjustedMonth = 4;
        break;
      case "June":
        adjustedMonth = 5;
        break;
      case "July":
        adjustedMonth = 6;
        break;
      case "August":
        adjustedMonth = 7;
        break;
      case "September":
        adjustedMonth = 8;
        break;
      case "October":
        adjustedMonth = 9;
        break;
      case "November":
        adjustedMonth = 10;
        break;
      case "December":
        adjustedMonth = 11;
        break;
      default:
        adjustedMonth = 0;
    }
    // Uwaga: Numer miesiąca zaczyna się od 0 (styczeń) do 11 (grudzień)
    return new Date(2023, adjustedMonth + 1, 0).getDate();
  }

  function generateHeatmapData(year, month) {
    const daysInMonth = getDaysInMonth(year, month);
    const series = Array.from({ length: daysInMonth }, (_, day) => ({
      name: `Day ${day + 1}`,
      data: Array.from({ length: 7 }, (_, weekday) => ({
        x: weekday,
        y: Math.floor(Math.random() * 100),
      })),
    }));
    return series;
  }
  const checkDays = generateHeatmapData(month);



  const [state, setState] = useState({
    series: [
      {
        name: "Monday",
        data: [
          {
            x: "Week 1",
            y:3
           
          },
          {
            x: "Week 2",
            y: 2,
          },
          {
            x: "Week 3",
            y: 2,
          },
          {
            x: "Week 4",
            y: 5,
          },
          {x: "Week 1",
          y: 2
        },
        ],
      },
      {
        name: "Tuesday",
        data: [
          {
            x: "Week 1",
            y: 2,
          },
          {
            x: "Week 1",
            y: 3,
          },
          {
            x: "Week 1",
            y: 5,
          },
          {
            x: "Week 1",
            y: 6,
          },
        ],
      },
      {
        name: "Wednesday ",
        data: [
          {
            x: "Week 1",
            y: "2",
          },
          {
            x: "Week 1",
            y: "2",
          },
          {
            x: "Week 1",
            y: "2",
          },
          {
            x: "Week 1",
            y: "2",
          },
        ],
      },
      {
        name: "Thursday ",
        data: [
          {
            x: "Week 1",
            y: 2,
          },
          {
            x: "Week 1",
            y: 2,
          },
          {
            x: "Week 1",
            y: 2,
          },
          {
            x: "Week 1",
            y: 2,
          },
        ],
      },
      {
        name: "Friday ",
        data: [
          {
            x: "Week 1",
            y: 2,
          },
          {
            x: "Week 1",
            y: 2,
          },
          {
            x: "Week 1",
            y: 2,
          },
          {
            x: "Week 1",
            y: 2,
          },
        ],
      },
      {
        name: "Saturday ",
        data: [
          {
            x: "Week 1",
            y: 2,
          },
          {
            x: "Week 1",
            y: 2,
          },
          {
            x: "Week 1",
            y: 2,
          },
          {
            x: "Week 1",
            y: 2,
          },
          
        
        ],
      },
      {
        name: "Sunday ",
        data: [
          {
            x: "Week 1",
            y: 2,
          },
          {
            x: "Week 1",
            y: 2,
          },
          {
            x: "Week 1",
            y: 2,
          },
          {
            x: "Week 1",
            y: 2,
          },
        ],
      },
      
    ],
    options: {
      chart: {
        height: 150,
        width:200,
        type: "heatmap",
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        type: "category",
      },
      colors: ["#008FFB"],
      title: {
        text: "HeatMap Chart (Single color)",
      },
    },
  });

  return (
    <div className="heatMapChart" id="chart">
      <ReactApexChart
        options={state.options}
        series={state?.series}
        type="heatmap"
        height={350}
      />
      <div>
        <select name="" id="" onChange={(e) => setMonth(e.target.value)}>
          <option value="January">Januray</option>
          <option value="February">February</option>
          <option value="March">March</option>
          <option value="April">April</option>
          <option value="May">May</option>
          <option value="June">July</option>
          <option value="July">June</option>
          <option value="August">August</option>
          <option value="September">September</option>
          <option value="October">October</option>
          <option value="November">November</option>
          <option value="December">December</option>
        </select>
      </div>
    </div>
  );
};
