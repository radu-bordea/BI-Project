import React from "react";

const LocationForm = ({ formData, handleInputChange, handleSubmit }) => {
  return (
    // The form element with an event handler for form submission
    <form onSubmit={handleSubmit} className={"row bg-light my-3 mx-auto"}>
      {/* Input field for ID */}
      <div className="form-group  col-lg-6">
        <label htmlFor="id">ID</label>
        <input
          type="text"
          className="form-control form-control-sm"
          id="id"
          name="id"
          value={formData.id}
          onChange={handleInputChange}
          required // Field is required
        />
      </div>
      {/* Input field for Name */}
      <div className="form-group col-lg-6">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          className="form-control form-control-sm"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required // Field is required
        />
      </div>
      {/* Input field for Latitude */}
      <div className="form-group col-lg-6">
        <label htmlFor="lat">Latitude</label>
        <input
          type="text"
          className="form-control form-control-sm"
          id="lat"
          name="lat"
          value={formData.lat}
          onChange={handleInputChange}
          required // Field is required
        />
      </div>
      {/* Input field for Longitude */}
      <div className="form-group col-lg-6">
        <label htmlFor="long">Longitude</label>
        <input
          type="text"
          className="form-control form-control-sm"
          id="long"
          name="long"
          value={formData.long}
          onChange={handleInputChange}
          required // Field is required
        />
      </div>
      {/* Submit button */}
      <button
        type="submit"
        className="btn btn-outline-primary col-11 mx-auto btn-add"
      >
        Add Location
      </button>
    </form>
  );
};

export default LocationForm;
