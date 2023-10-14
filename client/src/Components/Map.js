import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Map.css";

const Map = () => {

  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);

  console.log(selectedCity)

  const fetchLocations = async () => {
    try {
      const response = await axios.get("http://localhost:5000/locations");
  
      const cityData = response.data.map(location => ({
        name: location.name,
        lat: location.location.lat,
        long: location.location.long
      }));
  
      setCities(cityData);
  
      console.log(cityData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  
  useEffect(() => {
    fetchLocations();
  }, []);

  
  useEffect(() => {
    const map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: 60.0971, lng: 19.9348 }, // New York coordinates
      zoom: 12,
    },[]);

    // add markers for all cities
    cities.forEach((city, index) => {
      new window.google.maps.Marker({
        position: { lat: city.lat, lng: city.long },
        map: map,
        title: city.name,
      });
    });
    

    
    // If a city is selected, update the map
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
  }, [selectedCity]);

  const handleCity = (city) => {
    setSelectedCity(city)
    
  }

  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col-md-2">
          <div className="list-group city-btn">
            {cities.map(
              (city, index) => (
                <button
                  key={index}
                  onClick={() => handleCity(city.name)}
                  type="button"
                  className="list-group-item list-group-item-action"
                >
                  {city.name}
                </button>
              )
            )}
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
