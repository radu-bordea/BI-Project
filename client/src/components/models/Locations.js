import { useState, useEffect } from "react";
import axios from "axios";

function Locations() {
  const [locations, setLocations] = useState([]);

  const fetchLocations = async () => {
    try {
      const response = await axios.get("http://localhost:5000/locations");
      setLocations(response.data); // Update to set the entire response.data array
      console.log(locations);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  return (
    <>
      <hr style={{ width: "80%" }} />
      <div style={{ overflowX: "auto", whiteSpace: "nowrap" }}>
        {locations.map((location, index) => (
          <button key={index} style={{ marginRight: "10px" }}>
            {location.name}
          </button>
        ))}
      </div>
      <hr style={{ width: "80%" }} />
    </>
  );
  
}

export default Locations;
