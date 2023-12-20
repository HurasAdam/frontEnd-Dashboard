import React, { Component, useContext, useEffect } from "react";
import Chart from "react-apexcharts";
import "../../components/donutChart/donut.css";
import { useState } from "react";
import missingData from "../../../public/img/empty.png";
import { chartConfig } from "../../utils/chartConfig";

export const Donut = ({data, theme }) => {

  const [state, setState] = useState({
    series: [],
    labels:[],
  });
  const donutChartConfig = chartConfig("donut-dashboard",state.labels,theme);

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
        labels:arrayOfKeys
      });
    }
  }, [data]);

  return (
    <div className={`donut ${state.series.length>0?'':'hidden'}`}>
      {state.series.length > 0 ? (
        <Chart options={donutChartConfig} series={state.series} type="donut" />
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
