import React from "react";

const DeviceForm = ({
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
      {/* Input field for locationsId */}
      <div className="form-group col-lg-6">
        <label htmlFor="locationId">Location Id</label>
        <input
          type="text"
          className="form-control form-control-sm"
          id="locationId"
          name="locationId"
          value={formData.locationId}
          onChange={handleInputChange}
          required
        />
      </div>
      {/* Input field for typeId */}
      <div className="form-group col-lg-6">
        <label htmlFor="typeId">Type Id</label>
        <input
          type="text"
          className="form-control form-control-sm"
          id="typeId"
          name="typeId"
          value={formData.typeId}
          onChange={handleInputChange}
          required
        />
      </div>
      {/* Input field for keeperId */}
      <div className="form-group col-lg-6">
        <label htmlFor="keeperId">Keeper Id</label>
        <input
          type="text"
          className="form-control form-control-sm"
          id="keeperId"
          name="keeperId"
          value={formData.keeperId}
          onChange={handleInputChange}
          required
        />
      </div>
      {/* Input field for address */}
      <div className="form-group col-lg-6">
        <label htmlFor="address">Address</label>
        <input
          type="text"
          className="form-control form-control-sm"
          id="address"
          name="address"
          value={formData.address}
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
          {isEditing ? "Update Device" : "Add Device"}
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

export default DeviceForm;
