import React from "react";

const TypeForm = ({
  formData,
  handleInputChange,
  handleSubmit,
  isEditing,
  handleCancel, // Add handleCancel prop
}) => {
  return (
    <form onSubmit={handleSubmit} className="row my-3 mx-auto">
      {/* Input field for ID */}
      <div className="form-group col-lg-3">
        {isEditing && (
          <div>
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
        )}
      </div>
      {/* Input field for Name */}
      <div className="form-group col-lg-3">
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
      {/* Input field for Unit */}
      <div className="form-group col-lg-3">
        <label htmlFor="unit">Unit</label>
        <input
          type="text"
          className="form-control form-control-sm"
          id="unit"
          name="unit"
          value={formData.unit}
          onChange={handleInputChange}
          required
        />
      </div>

      {/* Input field for Longitude */}
      <div className="form-group col-lg-3">
        <label htmlFor="precision">Precision</label>
        <input
          type="text"
          className="form-control form-control-sm"
          id="precision"
          name="precision"
          value={formData.precision}
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
          {isEditing ? "Update Type" : "Add Type"}
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

export default TypeForm;
