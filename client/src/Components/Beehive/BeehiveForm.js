import React from "react";

const BeehiveForm = ({
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
      {/* Input field for Devices array */}
      <div className="form-group col-lg-6">
        <label htmlFor="devicesIds">All Devices</label>
        <input
          type="text"
          className="form-control form-control-sm"
          id="devicesIds"
          name="devicesIds"
          value={formData.devicesIds}
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
          {isEditing ? "Update Devices Ids" : "Add Devices Ids"}
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

export default BeehiveForm;
