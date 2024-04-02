import React, { useEffect, useState } from "react";
import axios from "axios";

const Map = () => {
  const [selectedCity, setSelectedCity] = useState(null);

  // cities
  const [cities, setCities] = useState([]);

  const [loading, setLoading] = useState(true); // New loading state

  const serverURL = "https://bi-project-server.onrender.com";

  // Function to fetch locations from the server
  const fetchLocations = async () => {
    try {
      const response = await axios.get(serverURL + "/locations");
      const cityData = response.data.map((location) => ({
        _id: location._id,
        name: location.name,
        lat: location.lat,
        long: location.long,
      }));

      // Sort the cityData array by id before setting it in the state
      cityData.sort((a, b) => a._id.localeCompare(b._id));

      setCities(cityData);
      setLoading(false); // Data has been fetched, set loading to false
      console.log(cityData);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false); // Error occurred, set loading to false
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  useEffect(() => {
    const initializeMap = () => {
      if (!window.google || !window.google.maps) {
        return;
      }

      const map = new window.google.maps.Map(document.getElementById("map"), {
        center: { lat: 60.0971, lng: 19.9348 },
        zoom: 10,
      });

      cities.forEach((city) => {
        new window.google.maps.Marker({
          position: { lat: city.lat, lng: city.long },
          map: map,
          title: city.name,
        });
      });

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

    if (!window.google || !window.google.maps) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&callback=initializeMap`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);

      return () => {
        document.head.removeChild(script);
      };
    } else {
      initializeMap();
    }
  }, [selectedCity, cities]);

  const handleCity = (city) => {
    setSelectedCity(city);
  };

  return (
    <div className="container">
      <h3>Here are the Devices with the Graph!</h3>
      <hr />
      <div className="row">
        <div className="row">
          <div className="list-group city-btn col-lg-3">
            {cities.map((city) => (
              <button
                key={city._id}
                onClick={() => handleCity(city.name)}
                type="button"
                className="btn btn-primary text-white m-1"
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
