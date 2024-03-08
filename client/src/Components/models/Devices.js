import { useState, useEffect } from "react";
import axios from "axios";
import "./models.css";

function Devices() {
  const [devices, setDevices] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const fetchDevices = async () => {
    try {
      const response = await axios.get("https://bi-project.onrender.com/devices");
      setDevices(response.data); // Update to set the entire response.data array
      console.log(devices);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDevices();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <hr />
      <div>
        {devices.map(device => (
          <button key={device._id}>{device._id}</button>
        ))}
      </div>
    </>
  );
}
export default Devices;
