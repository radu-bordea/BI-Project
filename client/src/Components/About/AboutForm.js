import React from "react";

const AboutForm = ({
  formData,
  handleInputChange,
  handleSubmit,
  isEditing,
  handleCancel, // Add handleCancel prop
}) => {
  return (
    <form onSubmit={handleSubmit} className="row text-center my-3 mx-auto">
      {/* Input field for title */}
      <div className="form-group col-lg-3">
        <label htmlFor="name">Title</label>
        <input
          type="text"
          className="form-control form-control-sm"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          required
        />
      </div>
      {/* Input field for message */}
      <div className="form-group col-lg-9">
        <label htmlFor="name">Message</label>
        <textarea
          rows='4'
          cols="50"
          className="form-control form-control-sm"
          id="message"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          required
        /><br/>
      </div><hr/>
      
      
      {/* Submit and Cancel buttons */}
      <div className=" text-center col-11 mt-2 mx-auto">
        <button
          type="submit"
          className={`w-75 m-1 btn btn-${isEditing ? "success" : "primary"}`}
        >
          {isEditing ? "Update Data" : "Add Data"}
        </button>
        {isEditing && ( // Render Cancel button only in edit mode
          <button
            type="button"
            className="w-75 m-1 btn btn-danger"
            onClick={handleCancel} // Call handleCancel function
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default AboutForm;
