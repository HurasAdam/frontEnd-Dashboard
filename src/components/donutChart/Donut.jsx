import React, { Component, useContext, useEffect } from "react";
import Chart from "react-apexcharts";
import "../../components/donutChart/donut.css";
import { useState } from "react";

export const Donut = ({ data, theme }) => {

  useEffect(() => {
    if (data) {
      const arrayOfKeys = data.filter((key) => key.value>0).map((key)=>{
        return key.name
      });
      const arrayOfValues = data.filter((val) => val.value>0).map((val)=>{
        return val.value
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
              colors: theme.color,
            },
            
          },
          dataLabels: {
            ...state.options.dataLabels,
            style: {
              ...state.options.dataLabels.style,
              colors: theme.mode === "dark" ? ["white"] : ["rgb(212, 81, 81);"],
            },
           background:{...state.options.dataLabels.background,enabled:theme.mode==='light'?true:false},
          
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
        background:{
borderColor:''
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
  // console.log({...state.options})
  return (
    <div className="donut">
      <Chart options={state.options} series={state.series} type="donut" />
    </div>
  );
};
