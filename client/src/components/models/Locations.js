import React, { useState, useEffect } from "react";
import axios from "axios";
import "./models.css";

const Locations = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get("http://localhost:5000/locations");
        setLocations(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchLocations();
  }, [locations]); // Include locations in the dependency array

  return (
    <div className="lev1">
      <div className="lev2">
        {locations.map((location, index) => (
          <button className="btn" key={index}>
            {location.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Locations;
