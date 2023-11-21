import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import beehive3 from '../images/beehive3.jpg'
import beehive4 from '../images/beehive4.jpg'
import beehive5 from '../images/beehive5.jpg'
import beehive6 from '../images/beehive6.jpg'
import beehive8 from '../images/beehive8.jpg'

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
        <img src={beehive3} alt="beehive 3" />
      </div>
      <div className="slider-img">
        <img src={beehive4} alt="beehive 4" />
      </div>
      <div className="slider-img">
        <img src={beehive5} alt="beehive 5" />
      </div>
      <div className="slider-img">
        <img src={beehive6} alt="beehive 6" />
      </div>

      <div className="slider-img">
        <img src={beehive8} alt="beehive 8" />
      </div>
    </Slider>
  );
}

export default Home
