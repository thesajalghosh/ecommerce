import React, { useState } from "react";
import "./index.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const BestSeller = ({ categoryies, bestLoading }) => {
  const navigate = useNavigate();
  const SkeletonLoading = () => (
    <div className="best__seller__category">
      <div className="category-container best__seller__element skeleton-placeholder"></div>
      <div className="category-container best__seller__element skeleton-placeholder"></div>
      <div className="category-container best__seller__element skeleton-placeholder"></div>
    </div>
  );
  return (
    <>
      <div className="best__seller__comp__whole__container">
        <div className="best__seller__header">
          {" "}
          Explore <span>BestSeller</span>
        </div>
        {bestLoading ? (
          <SkeletonLoading />
        ) : (
          <div className="best__seller__category">
            {categoryies?.map((ele) => (
              <div
                className="category-container"
                key={ele._id}
                onClick={() => navigate(`/bestsellet-product/${ele._id}`)}
              >
                <div className="best__seller__comp">
                  <div className="best__seller__image">
                    <img src={ele.url} alt={ele._id} />
                  </div>
                  <div className="best__seller__name">{ele.name}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default BestSeller;
