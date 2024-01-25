import React, { useState } from "react";
import "./index.css";
import axios from "axios";
import { toast } from "react-toastify";

const BestSeller = ({ categoryies }) => {
  return (
    <>
      <div className="best__seller__comp__whole__container">
        <div className="best__seller__header">
          {" "}
          Explore <span>BestSeller</span>
        </div>
        <div className="best__seller__category">
          {categoryies.map((ele) => (
            <div className="category-container" key={ele._id}>
              <div className="best__seller__comp">
                <div className="best__seller__image">
                  <img
                    src={`${process.env.REACT_APP_API}/api/v1/category/get-category-photo/${ele._id}`}
                    alt={ele._id}
                  />
                </div>
                <div className="best__seller__name">{ele.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BestSeller;
