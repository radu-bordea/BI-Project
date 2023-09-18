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
        color: "#474745", // Set legend label color to white
      },
    },
  },
  elements: {
    point: {
      backgroundColor: "#0f97e6", // Set point color to white
    },
    line: {
      borderColor: "#f7423cde", // Set line color to white
      borderWidth: 2,
    },
  },
};

function Content() {
  const [checkData, setCheckData] = useState(false)
  const [checkLocation, setCheckLocation] = useState(false)
  const [checkKeeper, setCheckKeeper] = useState(false)
  const [checkDevice, setCheckDevice] = useState(false)
  const [checkType, setCheckType] = useState(false)

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
    label: "Temperature",
    data: measurements.map((measure) => measure.value.$numberDecimal),
  };

  const data = {
    labels: labels,
    datasets: [dataset],
  };


  const handleButtonClick = (buttonName) => {
    setCheckData(buttonName === "data");
    setCheckLocation(buttonName === "location");
    setCheckKeeper(buttonName === "keeper");
    setCheckDevice(buttonName === "device");
    setCheckType(buttonName === "type");
  }

  return (
    <div className="content">
      <div className="content-header">
        <button className="model model-data" onClick={() => handleButtonClick("data")}>DATA</button>
        <button className="model" onClick={() => handleButtonClick("location")}>Locations</button>
        <button className="model" onClick={() => handleButtonClick("keeper")}>Keepers</button>
        <button className="model" onClick={() => handleButtonClick("device")}>Devices</button>
        <button className="model" onClick={() => handleButtonClick("type")}>Types</button>
      </div>
      <div className="content-graph">
        {checkData && measurements && measurements.length > 0 && (
          <Line data={data} options={options} />
        )}
        {checkLocation && <h1>Locations</h1>}
        {checkKeeper && <h1>Keepers</h1>}
        {checkDevice && <h1>Devices</h1>}
        {checkType && <h1>Types</h1>}
      </div>
    </div>
  );
}

export default Content;
