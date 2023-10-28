import React from 'react'

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  plugins: {
    legend: {
      labels: {
        color: "#d3caca",
      },
    },
  },
  elements: {
    point: {
      backgroundColor: "#0f97e6",
    },
    line: {
      borderColor: "#f7423cde",
      borderWidth: 3,
    },
  },
  scales: {
    x: {
      grid: {
        color: "#6b6a6a",
        borderWidth: 0.2,
      },
      ticks: {
        color: "#bbb9b6",
      },
    },
    y: {
      grid: {
        color: "#6e6e6d",
        borderWidth: 0.2,
      },
      ticks: {
        color: "#bbb9b6",
      },
    },
  },
};

const LineChart = ({data}) => {
  return (
      <Line data={data}  />
  );
}


export default LineChart
