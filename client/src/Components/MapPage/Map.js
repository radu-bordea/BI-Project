import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Map.css";
import { FaRegTrashAlt } from "react-icons/fa";
import LocationForm from "./LocationForm";

const Map = () => {
  // States to manage cities, selected city, and form data
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    lat: "",
    long: "",
  });

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
        map.setZoom(11);
      }
    }
  };

  // Effect to initialize the map when cities change
  useEffect(() => {
    initializeMap();
  }, [cities]);

  // Function to fetch locations from the server
  const fetchLocations = async () => {
    try {
      const response = await axios.get("http://localhost:5000/locations");

      // Process response data and set it in the state
      const cityData = response.data.map((location) => ({
        _id: location._id,
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

  // Effect to fetch locations when the selected city changes
  useEffect(() => {
    fetchLocations();
  }, [selectedCity]);

  // Function to handle city selection
  const handleCity = (city) => {
    setSelectedCity(city);
  };

  // Function to handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/locations", {
        _id: formData.id,
        name: formData.name,
        location: {
          lat: parseFloat(formData.lat),
          long: parseFloat(formData.long),
        },
      });
      console.log("Location added:", response.data);

      // Reset form data after successful submission
      setFormData({
        id: "",
        name: "",
        lat: "",
        long: "",
      });

      // Add the new location to the cities list
      setCities((prevCities) => [...prevCities, response.data]);
      setSelectedCity(response.data.name);
    } catch (error) {
      console.error("Error adding location:", error);
    }
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
      <div className="row mt-4">
        {/* Render the LocationForm component */}
        <LocationForm
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />

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
                <button
                  className="child_2 btn btn-danger col-3"
                  onClick={() => handleDelete(city._id)}
                >
                  <FaRegTrashAlt />
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
