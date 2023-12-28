import { useState } from "react";
import "./heatMapChart.css";
import ReactApexChart from "react-apexcharts";

export const HeatMapChart = ({ setSelectionOptions, result }) => {
  const [month, setMonth] = useState("");

  const [state, setState] = useState({
    series: [
      // ... Twoje dane series
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
      title: {
        text: `${month&&month} contribtions`,
      },
      plotOptions: {
        heatmap: {
          colorScale: {
            ranges: [
              {
                from: 0,
                to: 0,
                name: "zero",
                color: "#000000", // Kolor dla y równego 0 (rgb(13, 17, 23))
              },
              {
                from: 1,
                to: 2,
                name: "low",
                color: "#196127", // Kolor dla niskich wartości
              },
              {
                from: 3,
                to: 4,
                name: "medium",
                color: "#7bc96f", // Kolor dla średnich wartości
              },
              {
                from: 5,
                to: 6,
                name: "high",
                color: "#239a3b", // Kolor dla wysokich wartości
              },
              {
                from: 7,
                to: 8,
                name: "very-high",
                color: "#196127", // Kolor dla bardzo wysokich wartości
              },
            ],
          },
        },
      },
    },
  });

  return (
    <div className="heatMapChart" id="chart">
      <ReactApexChart
        options={state.options}
        series={result && result}
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
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          <option value="April">April</option>
          <option value="May">May</option>
          <option value="June">June</option>
          <option value="July">July</option>
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
