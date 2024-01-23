import React, { useEffect, useState } from "react";
import axios from "axios";

const Map = ({ cities }) => {
  // States to manage cities, selected city, and form data
  const [selectedCity, setSelectedCity] = useState(null);

  // Function to initialize the map
  const initializeMap = () => {

    if(!window.google || !window.google.maps) {
      // Google Maps API not available yet, return or handle acordingly
      return
    }

    const map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: 60.0971, lng: 19.9348 },
      zoom: 10,
    });

    // Add markers for each city on the map
    cities.forEach((city, index) => {
      new window.google.maps.Marker({
        position: { lat: city.lat, lng: city.long },
        map: map,
        title: city.name,
      });
    });

    // If a city is selected, center the map on that city
    if (selectedCity) {
      const selectedCityCoords = cities.find(
        (city) => city.name === selectedCity
      );
      if (selectedCityCoords) {
        map.setCenter({
          lat: selectedCityCoords.lat,
          lng: selectedCityCoords.long,
        });
        map.setZoom(12);
      }
    }
  };

  // Effect to initialize the map when cities change
  useEffect(() => {
    // Check if the Google Maps API is available
    if (!window.google || !window.google.maps) {
      // Load Google Maps API script dynamically
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&callback=initMap`;
      script.async = true;
      script.defer = true;
      script.onload = initializeMap; // Call initializeMap after script is loaded
      document.head.appendChild(script);

      return () => {
        // Cleanup function to remove the script from the DOM when the component unmounts
        document.head.removeChild(script);
      };
    } else {
      // Google Maps API is already available, directly initialize the map
      initializeMap();
    }
  }, [selectedCity, cities]);

  // Function to handle city selection
  const handleCity = (city) => {
    setSelectedCity(city);
  };

  return (
    <div className="container">
      <h3>Here are the Devices with the Graph!</h3>
      <hr />
      <div className="row">
        <div className="row ">
          <div className="list-group  city-btn col-lg-3">
            {cities.map((city, index) => (
              <button
                key={city._id}
                onClick={() => handleCity(city.name)}
                type="button"
                className=" btn btn-primary text-white m-1"
              >
                {city.name}
              </button>
            ))}
          </div>
          <div id="map" className="map col-lg-9"></div>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default Map;
