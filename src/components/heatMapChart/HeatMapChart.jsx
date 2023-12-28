import { useState } from "react";
import "./heatMapChart.css";
import ReactApexChart from "react-apexcharts";
export const HeatMapChart = ({ setSelectionOptions,result }) => {
  const [month, setMonth] = useState("");


  const [state, setState] = useState({
    series: [
      {
        name: "Monday",
        data: [
          {
            x: "Week 1",
            y: 3,
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
          { x: "Week 1", y: 2 },
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
        width: 200,
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
        series={result&&result}
        type="heatmap"
        height={350}
      />
      <div>
        <select
          name=""
          id=""
          onChange={(e) =>
            setSelectionOptions((prev) => {
              return { ...prev, month: e.target.value };
            })
          }
        >
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
