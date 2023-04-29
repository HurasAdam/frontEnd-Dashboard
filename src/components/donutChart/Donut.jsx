import React, { Component } from 'react';
import Chart from 'react-apexcharts'
import '../../components/donutChart/donut.css'
import { useState } from 'react';
export const  Donut=({proprs})=> {

  const [state,setState]=useState({
    options: {
      legend: {
        position: 'bottom',
      },
      labels: ['kot','pies','kon','mysz','jastrzab'],
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
    series: [10, 20, 30, 40, 50],
  });
  
  return (
    <div className="donut">
      <Chart options={state.options} series={state.series} type="donut" />
    </div>
  );
}


