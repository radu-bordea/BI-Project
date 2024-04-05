import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  const [file, setFile] = useState();
  const [pictures, setPictures] = useState([]);

  const serverURL = "https://bi-project.onrender.com";
  // const serverURL = "http://localhost:5000";

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
      const response = await axios.get(serverURL + "/pictures");
      setPictures(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      await axios.post(serverURL + "/pictures/", formData);
      console.log(file);
      fetchPictures() // Refresh pictures after upload
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
            {/* Use imagePaths array to render images */}
            <img src={require(`../images/${picture.image}`).default} alt={picture.image} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Home;
