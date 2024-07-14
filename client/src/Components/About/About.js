import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import AboutForm from "./AboutForm";
import { FaRegTrashAlt, FaPencilAlt } from "react-icons/fa";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "react-toastify";

const About = () => {
  const { isAuthenticated } = useAuth0();

  const [formData, setFormData] = useState({
    id: "",
    title: "",
    message: "",
  });

  const [isEditing, setIsEditing] = useState(false); // Add an isEditing state

  const [loading, setLoading] = useState(true); // New loading state

  const [about, setAbout] = useState([]);

  const serverURL = "https://bi-project.onrender.com";

  const fetchAbout = async () => {
    try {
      const response = await axios.get(serverURL + "/about");
      const about = response.data.map((about) => ({
        _id: about._id,
        title: about.title,
        message: about.message,
      }));

      setAbout(about);
      setLoading(false);
      console.log(about);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAbout();
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
        // If not editing, add a new device
        const response = await axios.post(serverURL + "/about", {
          _id: formData.id,
          title: formData.title,
          message: formData.message,
        });
        console.log("About data added:", response.data);

        setFormData({
          id: "",
          title: "",
          message: "",
        });

        setAbout((prevAbout) => [...prevAbout, response.data]);
        toast.success("Data saved successfully");
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        // Handle the duplicate key error here (e.g., show an error message to the user).
        console.error(
          "Duplicate key error: About with the same ID already exists."
        );
        toast.error(
          "Duplicate key error: About with the same ID already exists!"
        );
      }
      console.error("Error adding data:", error);
      toast.error("Error saving data");
    }
  };

  const handleEdit = (about) => {
    setIsEditing(true);

    // Log the about object to the console
    console.log("Editing about:", about);

    // Set the formData with the selected about's data
    setFormData({
      id: about._id,
      title: about.title,
      message: about.message,
    });
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(serverURL + `/about/${formData.id}`, {
        _id: formData.id,
        title: formData.title,
        message: formData.message,
      });

      console.log("About data updated:", response.data);

      // Update the corresponding about in the devices state
      setAbout((prevAbout) =>
        prevAbout.map((about) =>
          about._id === formData.id ? response.data : about
        )
      );

      // Clear the form data and set isEditing to false
      setFormData({
        id: "",
        title: "",
        message: "",
      });
      setIsEditing(false);
      toast.success("Data updated successfully");
    } catch (err) {
      console.error("Error updating about data:", err);
      toast.error(err?.data?.message || err.error);
    }
  };

  const handleCancel = () => {
    // Clear the form data and set isEditing to false
    setFormData({
      id: "",
      title: "",
      message: "",
    });
    setIsEditing(false);
  };

  const handleDelete = async (id) => {
    console.log("Deleting about data with id:", id);
    try {
      const response = await axios.delete(serverURL + `/about/${id}`);

      console.log("Response from server:", response);

      if (response.status === 200) {
        console.log("About data deleted:", response.data);

        setAbout((prevAbout) => prevAbout.filter((about) => about._id !== id));
      }
      toast.success("Data deleted succesfully");
    } catch (err) {
      console.error("Error deleting about data:", err);
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          {isAuthenticated && (
            <AboutForm
              formData={formData}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              isEditing={isEditing}
              handleCancel={handleCancel} // Pass the handleCancel function
            />
          )}
        </div>
        <br />
        <div>
          {about.map((about) => {
            return (
              <div className="row text-center">
                <div className={isAuthenticated ? "col-md-10" : "col-md-12"}>
                  <h5>{about.title}</h5>
                  <p>{about.message}</p>
                </div>
                {isAuthenticated && (
                  <div className=" col-md-2 mb-2 ">
                    <div
                      className="btn btn-success mt-2 w-25 mx-2"
                      onClick={() => handleEdit(about)}
                    >
                      <FaPencilAlt />
                    </div>
                    <div
                      className="btn btn-danger mt-2 w-25 mx-2"
                      onClick={() => handleDelete(about._id)}
                    >
                      <FaRegTrashAlt />
                    </div>
                  </div>
                )}
                <hr />
                <br />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default About;
