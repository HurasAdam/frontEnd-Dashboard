import React, { Component, useEffect } from 'react';
import Chart from 'react-apexcharts'
import '../../components/donutChart/donut.css'
import { useState } from 'react';
export const  Donut=({data})=> {


  useEffect(()=>{
    if(data){

    const arrayOfKeys= data.map((key)=>key.name)
    const arrayOfValues= data.map((val)=>val.value)
setState({...state,series:arrayOfValues,options:{...state.options,labels:arrayOfKeys}})

    }
  },[data])



  const [state,setState]=useState({
    options: {
      legend: {
        position: 'bottom',
      },
      labels: [],
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 400
          },
          legend: {
            position: 'bottom'
          }
        }
      },
      {
        breakpoint: 390,
        options: {
          chart: {
            width: 250
          },
          legend: {
            position: 'bottom'
          }
        }
      }
    ],
      maintainAspectRatio: false
    },
    series: [],
  });
  // console.log({...state.options})
  return (
    <div className="donut">
      <Chart options={state.options} series={state.series} type="donut" />
    </div>
  );
}


