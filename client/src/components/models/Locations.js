import { useState, useEffect } from "react";
import axios from "axios";
import './models.css'

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
      <hr  />
      <div >
        {locations.map((location, index) => (
          <button  key={index} >
            {location.name}
          </button>
        ))}
      </div>
      <hr className="hr2"  />
    </>
  );
  
}

export default Locations;
