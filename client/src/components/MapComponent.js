// components/MapComponent.js
import React, { useEffect } from "react";

const MapComponent = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCyiqmAjUdox2KxJULSd_YHHm52jT-FMa0&callback=initMap`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.initMap = initMap;
    };
  }, []);

  const initMap = () => {
    const map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: 40.7128, lng: -74.0060 },
      zoom: 10,
    });

    new window.google.maps.Marker({
      position: { lat: 40.7128, lng: -74.0060 },
      map: map,
      title: "New York City",
    });
  };

  return <div id="map" style={{ width: "600px", height: "400px" }} />;
};

export default MapComponent;
