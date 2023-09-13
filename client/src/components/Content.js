import { useEffect, useState } from "react";
import axios from "axios";
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
import { Line } from "react-chartjs-2";

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
        color: '#474745' // Set legend label color to white
      }
    },
  },
  elements: {
    point: {
      backgroundColor: '#0f97e6' // Set point color to white
    },
    line: {
      borderColor: '#f7423cde', // Set line color to white
      borderWidth: 2
    }
  },
  
};

function Content() {
  const [measurements, setMeasurements] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/data");
      setMeasurements(response.data); // Update to set the entire response.data array
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString();
    return `${formattedDate}`;
  };

  useEffect(() => {
    fetchData();
  }, []);

  const labels = measurements.map((measure) =>
    formatTimestamp(measure.timeStamp)
  );
  const dataset = {
    label: "Measurement Data",
    data: measurements.map((measure) => measure.value.$numberDecimal),
  };

  const data = {
    labels: labels,
    datasets: [dataset],
  };

  return (
    <div className="content">
      {measurements && measurements.length > 0 && <Line data={data} options={options}/>}
    </div>
  );
}

export default Content;
