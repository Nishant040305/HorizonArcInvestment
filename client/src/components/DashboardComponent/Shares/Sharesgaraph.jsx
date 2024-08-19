

import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import './Sharegraph.css';
const LineData = {
  labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
  datasets: [
    {
      label: 'step',
      data: [1, 4, 2, 3, 6, 5, 6, 4, 2],
      borderColor: 'rgb(75, 192, 192)',
    },
    {
      label: 'step2',
      data: [1, 0, 5, 3, 2, 6, 7, 1, 2],
      borderColor: 'rgb(0,0,0)',
    },
  ],
};

const options = {
  maintainAspectRatio:false,
  aspectRatio: 1
}


const Sharesgaraph = () => {
  return (
    <div className="sharesGraph">
    <Line data={LineData}  options={options}></Line>

    </div>
  )
}

export default Sharesgaraph;

