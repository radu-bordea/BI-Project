import { useState, useEffect } from "react";
import axios from "axios";

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
      <hr style={{ width: "80%" }} />
      <div style={{ overflowX: "auto", whiteSpace: "nowrap" }}>
        {devices.map((device, index) => (
          <button key={index} style={{ marginRight: "10px" }}>
            {device._id}
          </button>
        ))}
      </div>
      <hr style={{ width: "80%" }} />
    </>
  );
  
}

export default Devices;
