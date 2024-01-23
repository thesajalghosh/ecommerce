import React from "react";

const CategoryForm = ({ handleSubmit, setValue, value, setPhoto, photo }) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="enter new category"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>
            {photo ? photo.name : "Upload Photo"}

            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={(e) => setPhoto(e.target.files[0])}
            />
          </label>
        </div>

        <button type="submit" className="btn btn-primary">
          {" "}
          Create Category
        </button>
      </form>
    </>
  );
};

export default CategoryForm;
