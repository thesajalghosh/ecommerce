import React from "react";

const CategoryForm = ({ handleSubmit, setValue, value }) => {
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

        <button type="submit" className="btn btn-primary">
          {" "}
          Create Category
        </button>
      </form>
    </>
  );
};

export default CategoryForm;
