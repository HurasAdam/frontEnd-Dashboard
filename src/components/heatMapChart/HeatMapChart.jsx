import { useState, useRef, useEffect } from "react";
import "./heatMapChart.css";
import ReactApexChart from "react-apexcharts";
import { handleCurrentMonth } from "../../utils/handleCurrentMonth";
export const HeatMapChart = ({
  selectionOptions,
  setSelectionOptions,
  result,
}) => {
  const { monthList, currentMonthName } = handleCurrentMonth();

  const chartTitleRef = useRef();
  console.log(currentMonthName);

  const [state, setState] = useState({
    series: [
      // ... Twoje dane series
    ],
    options: {
      chart: {
        height: 200,
        width: 150,
        type: "heatmap",
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        type: "category",
      },
      title: {
        text: `${selectionOptions?.month} contribtions`,
        style: {
          fontSize: "18px", // Zmiana rozmiaru czcionki
          color: "white", // Zmiana koloru czcionki
        },
      },
      plotOptions: {
        heatmap: {
          radius: 2,
          enableShades: true,
          shadeIntensity: 0.8,

          colorScale: {
            ranges: [
              {
                from: 0,
                to: 0,
                name: "-",
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

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      options: {
        ...prevState.options,
        title: {
          text: `${selectionOptions?.month} contributions`,
        },
      },
    }));
  }, [selectionOptions]);

  return (
    <div className="heatMapChart" id="chart">
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
          {monthList &&
            monthList.map((option, index) => {
              return (
                <option
                  selected={option === currentMonthName}
                  value={option}
                  key={index}
                >
                  {option}
                </option>
              );
            })}
        </select>
      </div>
      <ReactApexChart
        options={state.options}
        series={result && result}
        type="heatmap"
        height={350}
      />

    </div>
  );
};
