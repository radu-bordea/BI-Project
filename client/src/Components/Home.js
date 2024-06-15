import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import beehive1 from '../images/beehive1.jpg'
import beehive2 from '../images/beehive2.jpg'
import beehive3 from '../images/beehive3.jpg'


const Home = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 2,
    slidesToScroll: 1,
    // fade:true,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true
  }

  return (
    <Slider {...settings} className="slider-container">
      <div className="slider-img">
        <img src={beehive1} alt="beehive 3" />
      </div>
      <div className="slider-img">
        <img src={beehive2} alt="beehive 4" />
      </div>
      <div className="slider-img">
        <img src={beehive3} alt="beehive 5" />
      </div>
    </Slider>
  );
}

export default Home