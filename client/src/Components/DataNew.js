import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { LineChart } from "@mui/x-charts";

import "bootstrap/dist/css/bootstrap.min.css";

const DataNew = () => {
  const [measurements, setMeasurements] = useState([]);

  const [devices, setDevices] = useState([]);
  const [deviceChoice, setDeviceChoice] = useState("1");

  const [selectedDeviceType, setSelectedDeviceType] = useState("Temperature °C");

  const [labels, setLabels] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [selectedStartDate, setSelectedStartDate] = useState(
    new Date("2023-09-01")
  );
  const [selectedEndDate, setSelectedEndDate] = useState(() => {
    const defaultEndDate = new Date(selectedStartDate);
    defaultEndDate.setDate(defaultEndDate.getDate() + 7);
    return defaultEndDate;
  });

  const serverURL = "https://bi-project.onrender.com";

  const fetchDevices = async () => {
    try {
      const response = await axios.get(`${serverURL}/devices`);
      setDevices(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching devices:", error);
    }
  };

  const fetchData = async () => {
    if (!deviceChoice) return; // If no device is selected, do not fetch data
    try {
      const response = await axios.get(`${serverURL}/data`);
      const filteredMeasurements = response.data.filter((measure) => {
        const measureDate = new Date(measure.timeStamp);
        return (
          measure.deviceId === deviceChoice &&
          measureDate >= selectedStartDate &&
          measureDate <= selectedEndDate
        );
      });

      // Log the filtered data for debugging
      console.log(filteredMeasurements);

      // Extract labels (timestamps) and chart data (values)
      const newLabels = filteredMeasurements.map((measure) =>
        new Date(measure.timeStamp).toLocaleDateString()
      );
      console.log(newLabels);

      const newChartData = filteredMeasurements.map((measure) =>
        parseFloat(measure.value.$numberDecimal)
      );
      console.log(newChartData);

      setMeasurements(filteredMeasurements);
      setLabels(newLabels);
      setChartData(newChartData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchDevices();
  }, []);

  useEffect(() => {
    fetchData();
  }, [deviceChoice, selectedStartDate, selectedEndDate]);

  const getTypeLabel = (typeId) => {
    if (typeId === "1") return "Temperature °C";
    if (typeId === "2") return "Humidity %";
    if (typeId === "3") return "Weight kg";
    return "Unknown";
  };

  const handleDeviceChoice = (e) => {
    const chosenDeviceId = e.target.value;
    setDeviceChoice(chosenDeviceId);
    console.log(typeof chosenDeviceId);

    const device = devices.find(
      (device) => device._id.toString() === chosenDeviceId
    );
    if (device) {
      setSelectedDeviceType(getTypeLabel(device.typeId));
    }
  };

  const getColorsByDeviceType = (deviceType) => {
    switch (deviceType) {
      case "Temperature °C":
        return "#FF0000"; // Red
      case "Humidity %":
        return "#0000FF"; // Blue
      case "Weight kg":
        return "#008000"; // Green
      default:
        return "#000000"; // Default to black if none match
    }
  };

  return (
    <div className="container">
      <h3 className="text-center mt-4">Devices and Graph</h3>
      <hr />
      <div className="col">
        <div className="row justify-content-center">
          <div className="w-40 col-6 col-sm-4">
            <DatePicker
              selected={selectedStartDate}
              onChange={(date) => setSelectedStartDate(date)}
              dateFormat="yyyy-MM-dd"
              className="form-control mb-2"
            />
          </div>
          <div className="w-40 col-6 col-sm-4">
            <DatePicker
              selected={selectedEndDate}
              onChange={(date) => setSelectedEndDate(date)}
              dateFormat="yyyy-MM-dd"
              className="form-control mb-2"
            />
          </div>
        </div>
        <div className="row container mt-4">
          <div className="devices-container p-1 border comon-color">
            <div
              className="d-flex justify-content-around overflow-auto"
              style={{ whiteSpace: "nowrap" }}
            >
              {devices.map((device) => (
                <button
                  key={device._id}
                  className="btn btn-outline-primary btn-sm"
                  value={device._id} // Pass the device ID as the button value
                  onClick={handleDeviceChoice}
                >
                  Id: {device._id}
                </button>
              ))}
            </div>
          </div>
        </div>
        <hr />
        <div className="graph-container bg-light d-flex justify-content-center ">
          <LineChart
            xAxis={[{ scaleType: "point", data: labels, title: "Date" }]}
            series={[
              {
                data: chartData,
                // label: type,
                label: selectedDeviceType,
                color: getColorsByDeviceType(selectedDeviceType),
              },
            ]}
            width={
              window.innerWidth > 1200
                ? 900
                : window.innerWidth > 768
                ? 600
                : window.innerWidth
            } // Responsive width
            height={300}
          />
        </div>
      </div>
      <hr />
    </div>
  );
};

export default DataNew;
