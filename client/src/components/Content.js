import { useEffect, useState } from "react";
import axios from "axios";
import { FaLocationArrow } from "react-icons/fa";
import { IoAccessibility } from "react-icons/io5";
import { TbDevices2 } from "react-icons/tb";
import { WiCelsius, WiThermometerExterior, WiDayRainMix } from "react-icons/wi";
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
import "./Content.css";
import Devices from "./models/Devices";
import Locations from "./models/Locations";
import Keepers from "./models/Keepers";
import Types from "./models/Types";

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

function Content() {
  const [checkData, setCheckData] = useState(false);
  const [checkLocation, setCheckLocation] = useState(false);
  const [checkKeeper, setCheckKeeper] = useState(false);
  const [checkDevice, setCheckDevice] = useState(false);
  const [checkType, setCheckType] = useState(false);

  const [measurements, setMeasurements] = useState([]);
  const [behives, setBehives] = useState([]);
  const [behiveChoice, setBehiveChoice] = useState("");

  const [startDate, setStartDate] = useState("2023-09-01");
  const [endDate, setEndDate] = useState("2023-09-07");


  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/data");
      setMeasurements(response.data); // Update to set the entire response.data array
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchBehives = async () => {
    try {
      const response = await axios.get("http://localhost:5000/behives");
      setBehives(response.data);
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

  const fetchAll = () => {
    fetchData();
    fetchBehives();
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const labels = [
  ...new Set(measurements
  .filter((measure) => {
    const measureTimestamp = new Date(measure.timeStamp).getTime();
    return measureTimestamp >= new Date(startDate).getTime() && measureTimestamp <= new Date(endDate).getTime();
  })
  .map((measure) => formatTimestamp(measure.timeStamp))),
];


  const behiveMeasure = () => {
    let devices = ["1", "2", "3"];
    if (behiveChoice === "2") {
      devices = ["4", "5", "6"];
    }
    return devices;
  };

  const dev = behiveMeasure();

  const datasetTemp = {
    label: "Temp °C ",
    data: measurements
      .filter((measure) => measure.deviceId === dev[0])
      .map((measure) => measure.value.$numberDecimal),
    borderColor: "#f18787",
    backgroundColor: "red",
  };

  const datasetHum = {
    label: "Humidity g/m3",
    data: measurements
      .filter((measure) => measure.deviceId === dev[1])
      .map((measure) => measure.value.$numberDecimal),
    borderColor: "#8c8cd3",
    backgroundColor: "#0c0cc2",
  };

  const datasetWeight = {
    label: "Weight kg",
    data: measurements
      .filter((measure) => measure.deviceId === dev[2])
      .map((measure) => measure.value.$numberDecimal),
    borderColor: "#6cb66c",
    backgroundColor: "green",
  };

  const data = {
    labels: labels,
    datasets: [datasetTemp, datasetHum, datasetWeight],
  };

  const handleButtonClick = (buttonName) => {
    setCheckData(buttonName === "data");
    setCheckLocation(buttonName === "location");
    setCheckKeeper(buttonName === "keeper");
    setCheckDevice(buttonName === "device");
    setCheckType(buttonName === "type");
  };

  return (
    <div className="content">
      <div className="content-header">
        <button
          className="model model-data"
          onClick={() => handleButtonClick("data")}
        >
          DATA
        </button>
        <button className="model" onClick={() => handleButtonClick("location")}>
          Locations <FaLocationArrow />
        </button>
        <button className="model" onClick={() => handleButtonClick("keeper")}>
          Keepers <IoAccessibility />
        </button>
        <button className="model" onClick={() => handleButtonClick("device")}>
          Devices <TbDevices2 />
        </button>
        <button className="model" onClick={() => handleButtonClick("type")}>
          Types <WiCelsius /> <WiThermometerExterior /> <WiDayRainMix />
        </button>
      </div>
      <div className="content-graph">
        {checkData && measurements && measurements.length > 0 && (
          <div>
            {
              <>
                <hr style={{ width: "80%", borderColor: "#050505" }} />
                <div style={{ overflowX: "auto", whiteSpace: "nowrap" }}>
                  {behives.map((behive, index) => (
                    <button
                      className="behive"
                      key={index}
                      style={{ marginRight: "10px" }}
                      onClick={() => setBehiveChoice(behive._id)}
                    >
                      {`Behive ${behive._id}`}
                    </button>
                  ))}
                </div>
                <hr style={{ width: "80%", borderColor: "#050505" }} />
              </>
            }
            <form className="form">
              <div>
                <label for="startDate">Start Date:</label>
                <div className="span"></div>
                <input type="date" id="startDate" name="startDate" defaultValue={startDate} onChange={handleStartDateChange}/>
              </div>
              <div>
                <label for="endDate">End Date:</label>
                <div className="span"></div>
                <input type="date" id="endDate" name="endDate" defaultValue={endDate} onChange={handleEndDateChange}/>
              </div>
            </form>
            <Line data={data} options={options} />
          </div>
        )}
        {checkLocation && (
          <h1>
            <Locations />
          </h1>
        )}
        {checkKeeper && (
          <h1>
            <Keepers />
          </h1>
        )}
        {checkDevice && (
          <h1>
            <Devices />
          </h1>
        )}
        {checkType && (
          <h1>
            <Types />
          </h1>
        )}
      </div>
    </div>
  );
}

export default Content;
