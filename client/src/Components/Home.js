import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


import file_1712251074473 from "../images/file_1712251074473.jpg";

// Create a context for all files in the images folder
const images = require.context("../images", false, /\.(png|jpe?g|svg)$/);

const Home = () => {
  const [file, setFile] = useState();
  const [pictures, setPictures] = useState([]);

  // Get all image paths
  const imagePaths = images.keys().map(images);
  console.log(imagePaths);

  var settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
  };

  useEffect(() => {
    fetchPictures();
  }, []);

  const fetchPictures = async () => {
    try {
      const response = await axios.get("http://localhost:5000/pictures");
      setPictures(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      await axios.post("http://localhost:5000/pictures", formData);
      console.log(file);
    } catch (error) {
      console.error("Error uploading picture:", error);
      // Handle the error, show a message to the user, or perform any necessary action
    }
  };

  return (
    <div>
      <div>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button onClick={handleUpload}>Upload</button>
      </div>

      <Slider {...settings} className="slider-container">
        {pictures.map((picture, index) => (
          <div key={index} className="slider-img">
            {console.log(picture.image)}
            {/* Using the absolute path to the public directory */}
            <img
              // src={`./images/${picture.image}`}
              
              src={imagePaths[index]}
              alt={picture.image}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Home;
