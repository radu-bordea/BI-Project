import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Map.css";

const Map = () => {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  // state for form input values
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    lat: "",
    long: "",
  });

  console.log(selectedCity);

  const fetchLocations = async () => {
    try {
      const response = await axios.get("http://localhost:5000/locations");

      const cityData = response.data.map((location) => ({
        name: location.name,
        lat: location.location.lat,
        long: location.location.long,
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
    const map = new window.google.maps.Map(
      document.getElementById("map"),
      {
        center: { lat: 60.0971, lng: 19.9348 }, // New York coordinates
        zoom: 12,
      },
      []
    );

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
  }, [cities, selectedCity]);

  const handleCity = (city) => {
    setSelectedCity(city);
  };

  // Function to handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    })
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post("http://localhost:5000/locations", {
        _id: formData.id,
        name: formData.name,
        location: {
          lat: parseFloat(formData.lat),
          long: parseFloat(formData.long)
        }
      })
      console.log("Location added:", response.data)

      // Clear form input values after submission
      setFormData({
        id: "",
        name: "",
        lat: "",
        long: ""
      })

      // Update the list of locations
      setCities(prevCities => [...prevCities, response.data])

      // Fetch updated locations
    } catch (error) {
      console.error("Error adding location:", error)
    }
  }

  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col-md-2">
          <div className="list-group city-btn">
            {cities.map((city, index) => (
              <button
                key={index}
                onClick={() => handleCity(city.name)}
                type="button"
                className="list-group-item list-group-item-action"
              >
                {city.name}
              </button>
            ))}
          </div>
        </div>
        <div className="col-md-10">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="id">ID</label>
              <input
                type="text"
                className="form-control"
                id="id"
                name="id"
                value={formData.id}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="lat">Latitude</label>
              <input
                type="text"
                className="form-control"
                id="lat"
                name="lat"
                value={formData.lat}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="long">Longitude</label>
              <input
                type="text"
                className="form-control"
                id="long"
                name="long"
                value={formData.long}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Add Location
            </button>
          </form>
          <div id="map" className="map"></div>
        </div>
      </div>
    </div>
  );
};

export default Map;
