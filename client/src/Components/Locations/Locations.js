import React from "react";
import { useState } from "react";
import axios from "axios";
import LocationForm from "./LocationForm";
import { FaRegTrashAlt, FaPencilAlt } from "react-icons/fa";

const Locations = ({ cities, setCities, setSelectedCity }) => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    lat: "",
    long: "",
  });

  const [isEditing, setIsEditing] = useState(false); // Add an isEditing state

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "lat" || name === "long" ? parseFloat(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        // If editing, call handleUpdate
        handleUpdate();
      } else {
        // If not editing, add a new location
        const response = await axios.post("https://bi-project.onrender.com/locations", {
          _id: formData.id,
          name: formData.name,
          lat: formData.lat,
          long: formData.long,
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
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        console.error(
          "Duplicate key error: Location with the same ID already exists."
        );
        // Handle the duplicate key error here (e.g., show an error message to the user).
      }
      console.error("Error adding location:", error);
    }
  };

  const handleEdit = (city) => {
    setIsEditing(true);

    // Log the city object to the console
    console.log("Editing city:", city);

    // Set the formData with the selected location's data
    setFormData({
      id: city._id,
      name: city.name,
      lat: city.lat,
      long: city.long,
    });

  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `https://bi-project.onrender.com/location/${formData.id}`,
        {
          _id: formData.id,
          name: formData.name,
          lat: formData.lat,
          long: formData.long,
        }
      );

      console.log("Location updated:", response.data);

      // Update the corresponding location in the cities state
      setCities((prevCities) =>
        prevCities.map((city) =>
          city._id === formData.id ? response.data : city
        )
      );

      // Clear the form data and set isEditing to false
      setFormData({
        id: "",
        name: "",
        lat: "",
        long: "",
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating location:", error);
    }
  };

  const handleCancel = () => {
    // Clear the form data and set isEditing to false
    setFormData({
      id: "",
      name: "",
      lat: "",
      long: "",
    });
    setIsEditing(false);
  };

  const handleDelete = async (id) => {
    console.log("Deleting city with id:", id);
    try {
      const response = await axios.delete(
        `https://bi-project.onrender.com/location/${id}`
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
            formData={formData}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            isEditing={isEditing}
            handleCancel={handleCancel} // Pass the handleCancel function
          />

          <div className="list-group city-btn">
            {cities.map((city) => (
              <div key={cities._id} className="d-flex m-2 list-group-item list-group-item-dark">
                <span className="p-1">{city.name}</span>
                <div className="btn-del-container">
                  <FaPencilAlt
                    className="btn-del mt-2 text-success"
                    onClick={() => handleEdit(city)}
                  />
                  <FaRegTrashAlt
                    className="btn-del mt-2 text-danger"
                    onClick={() => handleDelete(city._id)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Locations;
