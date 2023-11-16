import React from "react";

const LocationForm = ({
  formData,
  handleInputChange,
  handleSubmit,
  isEditing,
  handleCancel, // Add handleCancel prop
}) => {
  return (
    <form onSubmit={handleSubmit} className="row my-3 mx-auto">
      {/* Input field for ID */}
      <div className="form-group col-lg-6">
        <label htmlFor="id">ID</label>
        <input
          type="text"
          className="form-control form-control-sm"
          id="id"
          name="id"
          value={formData.id}
          onChange={handleInputChange}
          required
          disabled={isEditing}
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
          required
        />
      </div>
      {/* Input field for Latitude */}
      <div className="form-group col-lg-6">
        <label htmlFor="lat">
          Latitude <span className="coordinates">N(+) | S(-)</span>
        </label>
        <input
          type="number"
          className="form-control form-control-sm"
          id="lat"
          name="lat"
          value={formData.lat}
          onChange={handleInputChange}
          required
        />
      </div>
      {/* Input field for Longitude */}
      <div className="form-group col-lg-6">
        <label htmlFor="long">
          Longitude <span className="coordinates">E(+) | W(-)</span>
        </label>
        <input
          type="number"
          className="form-control form-control-sm"
          id="long"
          name="long"
          value={formData.long}
          onChange={handleInputChange}
          required
        />
      </div>
      {/* Submit and Cancel buttons */}
      <div className="d-flex justify-content-between col-11 mt-3 mx-auto">
        <button
          type="submit"
          className={`m-1 btn btn-${isEditing ? "success" : "primary"}`}
        >
          {isEditing ? "Update Location" : "Add Location"}
        </button>
        {isEditing && ( // Render Cancel button only in edit mode
          <button
            type="button"
            className="m-1 btn btn-danger"
            onClick={handleCancel} // Call handleCancel function
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default LocationForm;
