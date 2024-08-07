import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import BeehiveForm from "./BeehiveForm";
import { FaRegTrashAlt, FaPencilAlt } from "react-icons/fa";
import { toast } from "react-toastify";

const Beehives = () => {
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
        // If not editing, add a new beehive
        const response = await axios.post(serverURL + "/beehives", {
          _id: formData.id,
          devicesIds: formData.devicesIds,
        });

        setFormData({
          id: "",
          devicesIds: "",
        });

        setBeehives((prevBeehives) => [...prevBeehives, response.data]);

        console.log("Beehive added:", response.data);
        toast.success("Data saved successfully");
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        //  Handle the duplicate key error here (e.g., show an error message to the user).
        console.error(
          "Duplicate key error: Behive with the same ID already exists."
        );
        toast.error(
          "Duplicate key error: Beehive with the same ID already exists!"
        );
      }
      console.error("Error adding beehive:", error);
      toast.error("Error saving data");
    }
  };

  const handleEdit = (beehive) => {
    setIsEditing(true);

    // Log the beehive object to the console
    console.log("Editing beehive:", beehive);

    // Set the formData with the selected beehive's data
    setFormData({
      id: beehive._id,
      devicesIds: beehive.devicesIds,
    });
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(serverURL + `/beehive/${formData.id}`, {
        _id: formData.id,
        devicesIds: formData.devicesIds,
      });

      console.log("Beehive updated:", response.data);

      // Update the corresponding beehive in the types state
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
      toast.success("Data updated successfully");
    } catch (err) {
      console.error("Error updating beehive:", err);
      toast.error(err?.data?.message || err.error);
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
        console.log("Beehive deleted:", response.data);

        setBeehives((prevBeehives) =>
          prevBeehives.filter((beehive) => beehive._id !== id)
        );
      }
      toast.success("Data deleted succesfully");
    } catch (err) {
      console.error("Error deleting beehive:", err);
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <BeehiveForm
            formData={formData}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            isEditing={isEditing}
            handleCancel={handleCancel} // Pass the handleCancel function
          />

          <div className="list-group">
            {beehives.map((beehive) => (
              <div
                key={beehive._id}
                className="d-flex m-2 list-group-item"
              >
                <span className="p-1">{beehive.devicesIds}</span>
                <div className="btn-del-container">
                  <button
                    className="btn btn-sm btn-outline-warning mx-1"
                    onClick={() => handleEdit(beehive)}
                  >Edit</button>
                  <button
                    className="btn btn-sm btn-outline-danger mx-1"
                    onClick={() => handleDelete(beehive._id)}
                  >Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Beehives;
