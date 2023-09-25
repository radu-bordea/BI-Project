import React from "react";
import Map from "./Map";
import { useState, useEffect } from "react";
import axios from "axios";
import "./models.css";

const Locations = () => {
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

  const center = { lat: 37.7749, lng: -122.4194 }; // Example coordinates (San Francisco)
  const zoom = 13; // Example zoom level

  return (
    <div className="lev1">
      <div className="lev2">
        {locations.map((location, index) => (
          <button className="btn" key={{index}}>{location.name}</button>
        ))}
      </div>
      <Map center={center} zoom={zoom} />
    </div>
  );
};

export default Locations;
