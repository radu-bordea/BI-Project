import React from "react";
import { useState } from "react";
import axios from "axios";
import DeviceForm from "./DeviceForm";
import { FaRegTrashAlt, FaPencilAlt } from "react-icons/fa";

const Devices = () => {
  const [formData, setFormData] = useState({
    id: "",
    locationId: "",
    typeId: "",
    keeperId: "",
    address: "",
  });

  const [isEditing, setIsEditing] = useState(false); // Add an isEditing state

  const [loading, setLoading] = useState(true); // New loading state

  const serverURL = "https://bi-project.onrender.com";

  // devices
  const [devices, setDevices] = useState([]);

    // Function to fetch devices from the server
    const fetchDevices = async () => {
      try {
        const response = await axios.get(serverURL + "/devices");
        const deviceData = response.data.map((device) => ({
          _id: device._id,
          locationId: device.locationId,
          typeId: device.typeId,
          keeperId: device.keeperId,
          address: device.address,
          apiKey: device.apiKey,
        }));
  
        // Sort the deviceData array by id before setting it in the state
        deviceData.sort((a, b) => a._id.localeCompare(b._id));
  
        setDevices(deviceData);
        setLoading(false); // Data has been fetched, set loading to false
        console.log(deviceData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false); // Error occurred, set loading to false
      }
    };

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
        // If not editing, add a new device
        const response = await axios.post(serverURL + "/devices", {
          _id: formData.id,
          locationId: formData.locationId,
          typeId: formData.typeId,
          keeperId: formData.keeperId,
          address: formData.address,
        });
        console.log("Device added:", response.data);

        setFormData({
          id: "",
          locationId: "",
          typeId: "",
          keeperId: "",
          address: "",
        });

        setDevices((prevDevices) => [...prevDevices, response.data]);
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        console.error(
          "Duplicate key error: Device with the same ID already exists."
        );
        // Handle the duplicate key error here (e.g., show an error message to the user).
      }
      console.error("Error adding device:", error);
    }
  };

  const handleEdit = (device) => {
    setIsEditing(true);

    // Log the device object to the console
    console.log("Editing device:", device);

    // Set the formData with the selected device's data
    setFormData({
      id: device._id,
      locationId: device.locationId,
      typeId: device.typeId,
      keeperId: device.keeperId,
      address: device.address,
    });
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(serverURL + `/device/${formData.id}`, {
        _id: formData.id,
        locationId: formData.locationId,
        typeId: formData.typeId,
        keeperId: formData.keeperId,
        address: formData.address,
      });

      console.log("Device updated:", response.data);

      // Update the corresponding device in the devices state
      setDevices((prevDevices) =>
        prevDevices.map((device) =>
          device._id === formData.id ? response.data : device
        )
      );

      // Clear the form data and set isEditing to false
      setFormData({
        id: "",
        locationId: "",
        typeId: "",
        keeperId: "",
        address: "",
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating device:", error);
    }
  };

  const handleCancel = () => {
    // Clear the form data and set isEditing to false
    setFormData({
      id: "",
      locationId: "",
      typeId: "",
      keeperId: "",
      address: "",
    });
    setIsEditing(false);
  };

  const handleDelete = async (id) => {
    console.log("Deleting device with id:", id);
    try {
      const response = await axios.delete(serverURL + `/device/${id}`);

      console.log("Response from server:", response);

      if (response.status === 200) {
        console.log("Device deleted:", response.data);

        setDevices((prevDevices) =>
          prevDevices.filter((device) => device._id !== id)
        );
      }
    } catch (error) {
      console.error("Error deleting device:", error);
    }
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <DeviceForm
            formData={formData}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            isEditing={isEditing}
            handleCancel={handleCancel} // Pass the handleCancel function
          />

          <div className="list-group city-btn">
            {devices.map((device) => (
              <div
                key={device._id}
                className="d-flex m-2 list-group-item list-group-item-dark"
              >
                <span className="p-1">
                  {device._id} {`-- -- --> apiKey: ${device.apiKey}`}
                </span>
                <div className="btn-del-container">
                  <FaPencilAlt
                    className="btn-del mt-2 text-success"
                    onClick={() => handleEdit(device)}
                  />
                  <FaRegTrashAlt
                    className="btn-del mt-2 text-danger"
                    onClick={() => handleDelete(device._id)}
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

export default Devices;
