import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import LineChart from "./LineChart";

const Data = () => {

  console.log('Data component rendered');
  // Rest of the component code...


  const [measurements, setMeasurements] = useState([]);
  const [beehives, setBeehives] = useState([]);
  const [beehiveChoice, setBeehiveChoice] = useState("1");
  const [selectedStartDate, setSelectedStartDate] = useState(
    new Date("2023-09-01")
  );
  const [selectedEndDate, setSelectedEndDate] = useState(() => {
    const defaultEndDate = new Date(selectedStartDate);
    defaultEndDate.setDate(defaultEndDate.getDate() + 7);
    return defaultEndDate;
  });
  const [labels, setLabels] = useState([]);

  const serverURL = "https://bi-project.onrender.com";

  const fetchData = async () => {
    try {
      const response = await axios.get(serverURL + "/data");
      setMeasurements(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchBeehives = async () => {
    try {
      const response = await axios.get(serverURL + "/beehives");
      setBeehives(response.data);
    } catch (error) {
      console.error("Error fetching beehives:", error);
    }
  };

  useEffect(() => {
    fetchBeehives();
    fetchData();
  }, []);

  useEffect(() => {
    setLabels(generateDateLabels());
  }, [selectedStartDate, selectedEndDate]);



  const handleBehiveSelection = (beehiveId) => {
    setBeehiveChoice(beehiveId);
  };

  const handleStartDateChange = (date) => {
    setSelectedStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setSelectedEndDate(date);
  };

  const generateDateLabels = () => {
    const startDate = moment(selectedStartDate);
    const endDate = moment(selectedEndDate);

    const labels = [];
    let currentDate = startDate;

    while (currentDate.isSameOrBefore(endDate, "day")) {
      labels.push(currentDate.format("YYYY-MM-DD"));
      currentDate.add(1, "day");
    }

    return labels;
  };

  const beehiveMeasure = (beehiveChoice) => {
    let devices = [];
    if (beehiveChoice === "2") {
      devices = ["4", "5", "6"]; // Example devices for beehive 2
    } else {
      devices = ["1", "2", "3"]; // Default devices for other beehives
    }
    return devices;
  };

  const renderDatasets = () => {
    const filteredMeasurements = filterMeasurementsByDate();
    const datasets = [];

    const dev = beehiveMeasure(beehiveChoice);

    const parameters = ["Temp °C", "Humidity g/m3", "Weight kg"];
    const colors = ["#f18787", "#8c8cd3", "#6cb66c"];

    parameters.forEach((param, index) => {
      const dataset = {
        label: param,
        data: filteredMeasurements
          .filter((measure) => measure.deviceId === dev[index])
          .map((measure) => measure.value.$numberDecimal),
        borderColor: colors[index],
        backgroundColor: colors[index],
      };
      datasets.push(dataset);
    });

    return datasets;
  };

  const filterMeasurementsByDate = () => {
    return measurements.filter((measure) => {
      const measureDate = moment(measure.timeStamp);
      return measureDate.isBetween(
        selectedStartDate,
        selectedEndDate,
        "day",
        "[]"
      );
    });
  };

  const data = {
    labels: labels,
    datasets: renderDatasets(),
  };

  return (
    <div className="container">
      <h3 className="text-center mt-4">Devices and Graph</h3>
      <hr />
      <div className="row">
        <div className="col-lg-2">
          <div className="list-group">
            {beehives.map((beehive) => (
              <button
                className={`m-1 btn ${
                  beehive._id === beehiveChoice ? "btn-primary" : "btn-secondary"
                }`}
                key={beehive._id}
                onClick={() => handleBehiveSelection(beehive._id)}
              >
                {`Beehive ID: ${beehive._id}`}
              </button>
            ))}
          </div>
        </div>
        <div className="col-lg-2">
          <DatePicker
            selected={selectedStartDate}
            onChange={handleStartDateChange}
            dateFormat="yyyy-MM-dd"
            className="form-control mb-2"
          />
          <DatePicker
            selected={selectedEndDate}
            onChange={handleEndDateChange}
            dateFormat="yyyy-MM-dd"
            className="form-control"
          />
        </div>
        <div className="col-lg-8">
          <div className="graph-container">
            <LineChart data={data} />
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default Data;
