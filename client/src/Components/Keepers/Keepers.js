import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import KeeperForm from "./KeeperForm";
import { FaRegTrashAlt, FaPencilAlt } from "react-icons/fa";

const Keepers = () => {
  const [formData, setFormData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const serverURL = "https://bi-project.onrender.com";

  const [loading, setLoading] = useState(true); // New loading state

  // keepers
  const [keepers, setKeepers] = useState([]);

  const [isEditing, setIsEditing] = useState(false); // Add an isEditing state

  // Function to fetch keepers from the server
  const fetchKeepers = async () => {
    try {
      const response = await axios.get(serverURL + "/keepers");
      const keeperData = response.data.map((keeper) => ({
        _id: keeper._id,
        firstName: keeper.firstName,
        lastName: keeper.lastName,
        email: keeper.email,
        phone: keeper.phone,
      }));

      setKeepers(keeperData);
      setLoading(false); // Data has been fetched, set loading to false
      console.log(keeperData);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false); // Error occurred, set loading to false
    }
  };

  useEffect(() => {
    fetchKeepers();
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
        // If not editing, add a new location
        const response = await axios.post(serverURL + "/keepers", {
          _id: formData.id,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
        });
        console.log("Keeper added:", response.data);

        setFormData({
          id: "",
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
        });

        setKeepers((prevKeepers) => [...prevKeepers, response.data]);
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        console.error(
          "Duplicate key error: Keeper with the same ID already exists."
        );
        // Handle the duplicate key error here (e.g., show an error message to the user).
      }
      console.error("Error adding keeper:", error);
    }
  };

  const handleEdit = (keeper) => {
    setIsEditing(true);

    // Log the keeper object to the console
    console.log("Editing keeper:", keeper);

    // Set the formData with the selected keeper's data
    setFormData({
      id: keeper._id,
      firstName: keeper.firstName,
      lastName: keeper.lastName,
      email: keeper.email,
      phone: keeper.phone,
    });
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(serverURL + `/keeper/${formData.id}`, {
        _id: formData.id,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
      });

      console.log("Keeper updated:", response.data);

      // Update the corresponding keeper in the keepers state
      setKeepers((prevKeepers) =>
        prevKeepers.map((keeper) =>
          keeper._id === formData.id ? response.data : keeper
        )
      );

      // Clear the form data and set isEditing to false
      setFormData({
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating keeper:", error);
    }
  };

  const handleCancel = () => {
    // Clear the form data and set isEditing to false
    setFormData({
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    });
    setIsEditing(false);
  };

  const handleDelete = async (id) => {
    console.log("Deleting keeper with id:", id);
    try {
      const response = await axios.delete(serverURL + `/keeper/${id}`);

      console.log("Response from server:", response);

      if (response.status === 200) {
        console.log("Keeper deleted:", response.data);

        setKeepers((prevKeepers) =>
          prevKeepers.filter((keeper) => keeper._id !== id)
        );
      }
    } catch (error) {
      console.error("Error deleting keeper:", error);
    }
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <KeeperForm
            formData={formData}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            isEditing={isEditing}
            handleCancel={handleCancel} // Pass the handleCancel function
          />

          <div className="list-group city-btn">
            {keepers.map((keeper) => (
              <div
                key={keeper._id}
                className="d-flex m-2 list-group-item list-group-item-dark"
              >
                <span className="p-1">
                  {keeper.firstName} {keeper.lastName}
                </span>
                <div className="btn-del-container">
                  <FaPencilAlt
                    className="btn-del mt-2 text-success"
                    onClick={() => handleEdit(keeper)}
                  />
                  <FaRegTrashAlt
                    className="btn-del mt-2 text-danger"
                    onClick={() => handleDelete(keeper._id)}
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

export default Keepers;
