import React, { Component, useContext, useEffect } from "react";
import Chart from "react-apexcharts";
import "../../components/donutChart/donut.css";
import { useState } from "react";
import missingData from "../../../public/img/empty.png";

export const Donut = ({ data, theme }) => {


  const getLegendColor = (themeMode) => {
    switch (themeMode) {
      case 'light':
        return 'black';
      case 'dark':
        return 'white';
      case 'purple':
        return 'orange';
        case'green':
        return'white';
      default:
        return 'black';
    }
  }



  useEffect(() => {
    if (data) {
      const arrayOfKeys = data
        .filter((key) => key.value > 0)
        .map((key) => {
          return key.name;
        });
      const arrayOfValues = data
        .filter((val) => val.value > 0)
        .map((val) => {
          return val.value;
        });
      setState({
        ...state,
        series: arrayOfValues,
        options: {
          ...state.options,
          labels: arrayOfKeys,
          legend: {
            ...state.options.legend,
            labels: {
              ...state.options.legend.labels,
              colors: getLegendColor(theme.mode)
            },
          },
          dataLabels: {
            ...state.options.dataLabels,
            style: {
              ...state.options.dataLabels.style,
              colors: theme.mode === "dark" ? ["white"] : ["rgb(212, 81, 81);"],
            },
            background: {
              ...state.options.dataLabels.background,
              enabled: theme.mode === "light" ? true : false,
            },
          },
        },
      });
    }
  }, [data]);

  const [state, setState] = useState({
    options: {
      dataLabels: {
        enabled: true,

        style: {
          colors: [],
        },
        background: {
          borderColor: "",
        },
      },
      legend: {
        position: "bottom",
        fontSize: "13px",
        labels: {
          colors: "",
        },
      },
      labels: [],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 400,
            },
            legend: {
              position: "bottom",
            },
          },
        },
        {
          breakpoint: 390,
          options: {
            chart: {
              width: 250,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
      maintainAspectRatio: false,
    },
    series: [],
  });

  return (
    <div className={`donut ${state.series.length>0?'':'hidden'}`}>
      {state.series.length > 0 ? (
        <Chart options={state.options} series={state.series} type="donut" />
      ) : (
        <div className="missingDataPlaceholder">
          <div className="missingaDataImgWrapper">
            <img
              className="missingDataPlaceholderImg"
              src={missingData}
              alt=""
            />
          </div>
          <div className='missingaDataTxtWrapper'>
            <span>No data found</span>
          </div>
        </div>
      )}
    </div>
  );
};
