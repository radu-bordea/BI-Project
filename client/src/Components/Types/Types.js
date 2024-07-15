import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import TypeForm from "./TypeForm";
import { FaRegTrashAlt, FaPencilAlt } from "react-icons/fa";
import { toast } from "react-toastify";

const Types = () => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    unit: "",
    precision: "",
  });

    // types
    const [types, setTypes] = useState([]);

    const serverURL = "https://bi-project.onrender.com";

    
  const [loading, setLoading] = useState(true); // New loading state

  const [isEditing, setIsEditing] = useState(false); // Add an isEditing state

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  
  // Function to fetch types from the server
  const fetchTypes = async () => {
    try {
      const response = await axios.get(serverURL + "/types");
      const typeData = response.data.map((type) => ({
        _id: type._id,
        name: type.name,
        unit: type.unit,
        precision: type.precision,
      }));

      setTypes(typeData);
      setLoading(false); // Data has been fetched, set loading to false
      console.log(typeData);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false); // Error occurred, set loading to false
    }
  };

  useEffect(()=> {
    fetchTypes();
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        // If editing, call handleUpdate
        handleUpdate();
      } else {
        // If not editing, add a new type
        const response = await axios.post(serverURL + "/types", {
          _id: formData.id,
          name: formData.name,
          unit: formData.unit,
          precision: formData.precision,
        });
        console.log("Type added:", response.data);

        setFormData({
          id: "",
          name: "",
          unit: "",
          precision: "",
        });

        setTypes((prevTypes) => [...prevTypes, response.data]);
        toast.success("Data saved successfully");
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        // Handle the duplicate key error here (e.g., show an error message to the user).
        console.error(
          "Duplicate key error: Type with the same ID already exists."
        );
        toast.error(
          "Duplicate key error: Type with the same ID already exists!"
        );
      }
      console.error("Error adding type:", error);
      toast.error("Error saving data");
    }
  };

  const handleEdit = (type) => {
    setIsEditing(true);

    // Log the type object to the console
    console.log("Editing type:", type);

    // Set the formData with the selected type's data
    setFormData({
      id: type._id,
      name: type.name,
      unit: type.unit,
      precision: type.precision,
    });
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(serverURL + `/type/${formData.id}`, {
        _id: formData.id,
        name: formData.name,
        unit: formData.unit,
        precision: formData.precision,
      });

      console.log("Type updated:", response.data);

      // Update the corresponding type in the types state
      setTypes((prevTypes) =>
        prevTypes.map((type) =>
          type._id === formData.id ? response.data : type
        )
      );

      // Clear the form data and set isEditing to false
      setFormData({
        id: "",
        name: "",
        unit: "",
        precision: "",
      });
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating type:", err);
      toast.error(err?.data?.message || err.error);
    }
  };

  const handleCancel = () => {
    // Clear the form data and set isEditing to false
    setFormData({
      id: "",
      name: "",
      unit: "",
      precision: "",
    });
    setIsEditing(false);
  };

  const handleDelete = async (id) => {
    console.log("Deleting type with id:", id);
    try {
      const response = await axios.delete(serverURL + `/type/${id}`);

      console.log("Response from server:", response);

      if (response.status === 200) {
        console.log("Type deleted:", response.data);

        setTypes((prevTypes) => prevTypes.filter((type) => type._id !== id));
        toast.success("Data deleted succesfully");
      }
    } catch (err) {
      console.error("Error deleting type:", err);
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <TypeForm
            formData={formData}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            isEditing={isEditing}
            handleCancel={handleCancel} // Pass the handleCancel function
          />

          <div className="list-group city-btn">
            {types.map((type) => (
              <div
                key={type._id}
                className="d-flex m-2 list-group-item list-group-item-dark"
              >
                <span className="p-1">{type.name}</span>
                <div className="btn-del-container">
                  <FaPencilAlt
                    className="btn-del mt-2 text-success"
                    onClick={() => handleEdit(type)}
                  />
                  <FaRegTrashAlt
                    className="btn-del mt-2 text-danger"
                    onClick={() => handleDelete(type._id)}
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

export default Types;
