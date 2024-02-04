import React, { useEffect, useState } from "react";
import "./index.css";
import axios from "axios";
import { toast } from "react-toastify";

const ShopCategory = () => {
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
  useEffect(() => {
    getAllCategory();
  }, []);
  return (
    <>
      <div className="shop__by__category__inner__container">
        <div className="shop__by__category__header">
          Shop By <span>Categoryies</span>
        </div>
        <div className="shop__by__category__all__category">
          {categories.map((ele) => (
            <>
              <div className="category__element">
                <img src={ele.url} />
                <div> {ele.name}</div>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default ShopCategory;
