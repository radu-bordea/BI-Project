import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Map.css";

const Map = ({cities, setCities}) => {
  // States to manage cities, selected city, and form data
  const [selectedCity, setSelectedCity] = useState(null);

  // Function to initialize the map
  const initializeMap = () => {
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
    initializeMap();
  }, [selectedCity]);


  // Function to handle city selection
  const handleCity = (city) => {
    setSelectedCity(city);
  };


  // Function to handle city deletion
  const handleDelete = async (id) => {
    console.log("Deleting city with id:", id);
    try {
      const response = await axios.delete(
        `http://localhost:5000/locations/${id}`
      );

      console.log("Response from server:", response);

      if (response.status === 200) {
        console.log("Location deleted:", response.data);

        // Filter out the deleted city from the cities list
        setCities((prevCities) => prevCities.filter((city) => city._id !== id));
      }
    } catch (error) {
      console.error("Error deleting location:", error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="row">
          <div className="list-group city-btn col-lg-3">
            {cities.map((city, index) => (
              <div className="btn-container " key={city._id}>
                <button
                  key={index}
                  onClick={() => handleCity(city.name)}
                  type="button"
                  className="btn-container btn btn-light mt-1 child_1 col-9"
                >
                  {city.name}
                </button>
              </div>
            ))}
          </div>
          <div id="map" className="map col-lg-9"></div>
        </div>
      </div>
    </div>
  );
};

export default Map;
