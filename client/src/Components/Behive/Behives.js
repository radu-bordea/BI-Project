import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import BehiveForm from "./BehiveForm";
import { FaRegTrashAlt, FaPencilAlt } from "react-icons/fa";

const Behives = () => {
  const [formData, setFormData] = useState({
    id: "",
    devicesIds: "",
  });

  const [isEditing, setIsEditing] = useState(false); // Add an isEditing state

    // beehives
    const [beehives, setBeehives] = useState([]);

    const serverURL = "https://bi-project.onrender.com";

    const [loading, setLoading] = useState(true); // New loading state

      // Function to fetch beehives from the server
  const fetchBeehives = async () => {
    try {
      const response = await axios.get(serverURL + "/beehives");
      const beehiveData = response.data.map((beehive) => ({
        _id: beehive._id,
        devicesIds: beehive.devicesIds,
      }));

      // Sort the beehiveData array by id before setting it in the state
      beehiveData.sort((a, b) => a._id.localeCompare(b._id));

      setBeehives(beehiveData);
      setLoading(false); // Data has been fetched, set loading to false
      console.log(beehiveData);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false); // Error occurred, set loading to false
    }
  };

  useEffect(() => {
    fetchBeehives();
  }, []);



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
      if (isEditing) {
        // If editing, call handleUpdate
        handleUpdate();
      } else {
        // If not editing, add a new type
        const response = await axios.post(serverURL + "/beehives", {
          _id: formData.id,
          devicesIds: formData.devicesIds,
        });
        console.log("Behive added:", response.data);

        setFormData({
          id: "",
          devicesIds: "",
        });

        setBeehives((prevBeehives) => [...prevBeehives, response.data]);
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        console.error(
          "Duplicate key error: Behive with the same ID already exists."
        );
        // Handle the duplicate key error here (e.g., show an error message to the user).
      }
      console.error("Error adding beehive:", error);
    }
  };

  const handleEdit = (type) => {
    setIsEditing(true);

    // Log the type object to the console
    console.log("Editing type:", type);

    // Set the formData with the selected type's data
    setFormData({
      id: type._id,
      devicesIds: type.devicesIds,
    });
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(serverURL + `/beehive/${formData.id}`, {
        _id: formData.id,
        devicesIds: formData.devicesIds,
      });

      console.log("Behive updated:", response.data);

      // Update the corresponding type in the types state
      setBeehives((prevBeehives) =>
        prevBeehives.map((beehive) =>
          beehive._id === formData.id ? response.data : beehive
        )
      );

      // Clear the form data and set isEditing to false
      setFormData({
        id: "",
        devicesIds: "",
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating beehive:", error);
    }
  };

  const handleCancel = () => {
    // Clear the form data and set isEditing to false
    setFormData({
      id: "",
      devicesIds: "",
    });
    setIsEditing(false);
  };

  const handleDelete = async (id) => {
    console.log("Deleting beehive with id:", id);
    try {
      const response = await axios.delete(serverURL + `/beehive/${id}`);

      console.log("Response from server:", response);

      if (response.status === 200) {
        console.log("Behive deleted:", response.data);

        setBeehives((prevBeehives) =>
          prevBeehives.filter((beehive) => beehive._id !== id)
        );
      }
    } catch (error) {
      console.error("Error deleting beehive:", error);
    }
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <BehiveForm
            formData={formData}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            isEditing={isEditing}
            handleCancel={handleCancel} // Pass the handleCancel function
          />

          <div className="list-group city-btn">
            {beehives.map((beehive) => (
              <div
                key={beehive._id}
                className="d-flex m-2 list-group-item list-group-item-dark"
              >
                <span className="p-1">{beehive.devicesIds}</span>
                <div className="btn-del-container">
                  <FaPencilAlt
                    className="btn-del mt-2 text-success"
                    onClick={() => handleEdit(beehive)}
                  />
                  <FaRegTrashAlt
                    className="btn-del mt-2 text-danger"
                    onClick={() => handleDelete(beehive._id)}
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

export default Behives;
