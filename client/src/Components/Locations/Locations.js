import React from "react";
import { useState } from "react";
import axios from "axios";
import LocationForm from "../MapPage/LocationForm";
import { FaRegTrashAlt } from "react-icons/fa";
import './Locations.css'

const Locations = ({ cities, setCities, setSelectedCity }) => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    lat: "",
    long: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

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

      setFormData({
        id: "",
        name: "",
        lat: "",
        long: "",
      });

      setCities((prevCities) => [...prevCities, response.data]);
      setSelectedCity(response.data.name);
    } catch (error) {
      console.error("Error adding location:", error);
    }
  };

  const handleDelete = async (id) => {
    console.log("Deleting city with id:", id);
    try {
      const response = await axios.delete(
        `http://localhost:5000/locations/${id}`
      );

      console.log("Response from server:", response);

      if (response.status === 200) {
        console.log("Location deleted:", response.data);

        setCities((prevCities) => prevCities.filter((city) => city._id !== id));
      }
    } catch (error) {
      console.error("Error deleting location:", error);
    }
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <LocationForm
            className="form col-9"
            formData={formData}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
          />
          <div className="list-group city-btn col-3">
            {cities.map((city) => (
              <div className="btn-container row" key={city._id}>
                <h1 className="btn-container btn btn-light mt-1 child_1 col-9">
                  {city.name}
                </h1>
                <button
                  className="child_2 btn btn-danger col-3"
                  onClick={() => handleDelete(city._id)}
                >
                  <FaRegTrashAlt />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Locations;
