import { useState, useEffect } from "react";
import axios from "axios";
import "./models.css";

function Devices() {
  const [devices, setDevices] = useState([]);

  const fetchDevices = async () => {
    try {
      const response = await axios.get("http://localhost:5000/devices");
      setDevices(response.data); // Update to set the entire response.data array
      console.log(devices);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchDevices();
  }, []);

  return (
    <>
      <hr />
      <div>
        {devices.map((device, index) => (
          <button key={index}>{device._id}</button>
        ))}
      </div>
    </>
  );
}

export default Devices;
