import React from "react";

const KeeperForm = ({
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
      {/* Input field for firstName */}
      <div className="form-group col-lg-6">
        <label htmlFor="name">First Name</label>
        <input
          type="text"
          className="form-control form-control-sm"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          required
        />
      </div>
      {/* Input field for lastName */}
      <div className="form-group col-lg-6">
        <label htmlFor="name">Last Name</label>
        <input
          type="text"
          className="form-control form-control-sm"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          required
        />
      </div>
      {/* Input field for email */}
      <div className="form-group col-lg-6">
        <label htmlFor="name">Email</label>
        <input
          type="text"
          className="form-control form-control-sm"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
      </div>
      {/* Input field for phone */}
      <div className="form-group col-lg-6">
        <label htmlFor="name">Phone</label>
        <input
          type="text"
          className="form-control form-control-sm"
          id="phone"
          name="phone"
          value={formData.phone}
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
          {isEditing ? "Update Keeper" : "Add Keeper"}
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

export default KeeperForm;
