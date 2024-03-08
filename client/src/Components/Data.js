import React, { useState, useEffect } from "react";
import axios from "axios";

import "./Data.css";

import LineChart from "./LineChart";

const Data = () => {
  const [measurements, setMeasurements] = useState([]);
  const [behives, setBehives] = useState([]);
  const [behiveChoice, setBehiveChoice] = useState("");
  const [startDate, setStartDate] = useState("2023-09-01");
  const [endDate, setEndDate] = useState("2023-09-07");

  // Define formatTimestamp function before using it
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString();
    return `${formattedDate}`;
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("/data");
      setMeasurements(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchBehives = async () => {
    try {
      const response = await axios.get("/behives");
      setBehives(response.data);
    } catch (error) {
      console.error("Error fetching behives:", error);
    }
  };

  useEffect(() => {
    fetchBehives();
    fetchData();
  }, []);

  const behiveMeasure = () => {
    let devices = ["1", "2", "3"];
    if (behiveChoice === "2") {
      devices = ["4", "5", "6"];
    }
    return devices;
  };

  const dev = behiveMeasure();

  const labels = [
    ...new Set(
      measurements
        .filter((measure) => {
          const measureTimestamp = new Date(measure.timeStamp).getTime();
          return (
            measureTimestamp >= new Date(startDate).getTime() &&
            measureTimestamp <= new Date(endDate).getTime()
          );
        })
        .map((measure) => formatTimestamp(measure.timeStamp))
    ),
  ];

  const datasetTemp = {
    label: "Temp °C",
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

  return (
    <div className="container">
      <h3>Here are the Devices with the Graph!</h3>
      <hr />
      <div className="row">
        <div className="list-group city-btn col-12 col-lg-2">
          {behives.map((behive) => (
            <button
              className=" m-1 btn btn-primary"
              key={behive._id}
              onClick={() => setBehiveChoice(behive._id)}
            >
              {`Beehive ID: ${behive._id}`}
            </button>
          ))}
        </div>
        <div className="graph-container col-12 col-lg-10">
          <LineChart data={data} />
        </div>
      </div>
      <hr />
    </div>
  );
};

export default Data;
