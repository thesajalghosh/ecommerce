import React, { useState } from "react";

const OfferProductCreate = () => {
  const [categories, setCategories] = useState([]);

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-all-category`
      );

      if (data.success) {
        setCategories(data?.category);
      }
      // console.log(data.category);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <div>
      <div className="offer__product__category__whole__container">
        <div className="offer__product__create__header">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((ele) => (
              <option key={ele.name} value={ele._id}>
                {ele.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default OfferProductCreate;
