// components/Locations.js
import React, { useState } from "react";
import ReactDOM from "react-dom";
import MapComponent from './MapComponent';

const Modal = ({ showModal, closeModal }) => {
  if (!showModal) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        <MapComponent />
      </div>
    </div>
  );
};

const MapHook = (props) => {
  return ReactDOM.createPortal(
    <div className="backdrop" onClick={props.onClick}>
      <h1>Locations</h1>
      <div>
        <button onClick={props.openModal}>Open Modal</button>
        <Modal showModal={props.showModal} closeModal={props.closeModal} />
      </div>
    </div>,
    document.getElementById("map-hook")
  );
};

function Locations() {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <MapHook openModal={openModal} showModal={showModal} closeModal={closeModal} />
    </div>
  );
}

export default Locations;
