import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Map.css";

const Map = () => {
  const [locationsName, setLocationsName] = useState([]);
  const [locationsCoordinates, setLocationsCoordinates] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);

  const fetchLocations = async () => {
    try {
      const response = await axios.get("http://localhost:5000/locations");

      // Extract names and coordinates
      const names = response.data.map(location => location.name);
      const coordinates = response.data.map(location => location.location);

      // Update states
      setLocationsName(names);
      setLocationsCoordinates(coordinates);

      console.log(names);
      console.log(coordinates[0]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);


  useEffect(() => {
    const map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: 60.0971, lng: 19.9348 },
      zoom: 14,
    });

    // Add a marker for Mariehamn
    new window.google.maps.Marker({
      position: { lat: 60.0971, lng: 19.9348 },
      map: map,
      title: "Mariehamn",
    });

    // Add markers for locations
    locationsCoordinates.forEach(location => {
      new window.google.maps.Marker({
        position: { lat: location.lat, lng: location.long },
        map: map,
        title: location.name,
      });
    });

    // If a city is selected, update the map
    if (selectedCity) {
      const selectedCityCoords = locationsCoordinates.find(
        location => location.name === selectedCity
      );
      if (selectedCityCoords) {
        map.setCenter({
          lat: selectedCityCoords.lat,
          lng: selectedCityCoords.long, // Changed from lng to long
        });
        map.setZoom(14);
      }
    }
  }, [selectedCity, locationsCoordinates]); // Added locationsCoordinates as dependency

  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col-md-2">
          <div className="list-group city-btn">
            {locationsName.map((city, index) => ( // Changed from hard-coded cities to using locationsName
              <button
                key={index}
                onClick={() => setSelectedCity(city)}
                type="button"
                className="list-group-item list-group-item-action"
              >
                {city}
              </button>
            ))}
          </div>
        </div>
        <div className="col-md-10">
          <div id="map" className="map"></div>
        </div>
      </div>
    </div>
  );
};

export default Map;
