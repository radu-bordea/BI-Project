import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import AboutForm from "./AboutForm";
import { FaRegTrashAlt, FaPencilAlt } from "react-icons/fa";

const About = () => {
  const [aboutForm, setAboutForm] = useState({
    id: "",
    title: "",
    message: "",
  });

  const [isEditing, setIsEditing] = useState(false); // Add an isEditing state

  const [loading, setLoading] = useState(true); // New loading state

  const [aboutData, setAboutData] = useState([]);

  const serverURL = "https://bi-project.onrender.com";

  const fetchAboutData = async () => {
    try {
      const response = await axios.get(serverURL + "/about");
      console.log(response.data);
      setAboutData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchAboutData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAboutForm({
      ...aboutForm,
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
          _id: aboutForm.id,
          title: aboutForm.title,
          message: aboutForm.message,
        });
        console.log("ABout data added:", response.data);

        setAboutForm({
          id: "",
          title: "",
          message: "",
        });

        setAboutData((prevAboutData) => [...prevAboutData, response.data]);
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

  const handleEdit = (about) => {
    setIsEditing(true);

    // Log the about object to the console
    console.log("Editing about:", about);

    // Set the formData with the selected about's data
    setAboutForm({
      id: aboutData._id,
      title: aboutData.title,
      message: aboutData.message,
    });
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(serverURL + `/about/${aboutData.id}`, {
        _id: aboutData.id,
        title: aboutData.title,
        message: aboutData.message,
      });

      console.log("About data updated:", response.data);

      // Update the corresponding about in the devices state
      setAboutData((prevAbout) =>
        prevAbout.map((about) =>
          about._id === aboutForm.id ? response.data : about
        )
      );

      // Clear the form data and set isEditing to false
      setAboutForm({
        id: "",
        title: "",
        message: "",
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating about data:", error);
    }
  };

  const handleCancel = () => {
    // Clear the form data and set isEditing to false
    setAboutForm({
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

        setAboutData((prevAboutData) =>
          prevAboutData.filter((about) => about._id !== id)
        );
      }
    } catch (error) {
      console.error("Error deleting about data:", error);
    }
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <AboutForm
            aboutForm={aboutForm}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            isEditing={isEditing}
            handleCancel={handleCancel} // Pass the handleCancel function
          />
        </div>
        <div>
          {aboutData.map((about) => {
            return (
              <div className="row text-center">
                <div className="col-md-10">
                  <h5>{about.title}</h5>
                  <p>{about.message}</p>
                </div>
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
                </div>{" "}
                <hr />
                <br />
                <br />
                <br />
                <br />
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
