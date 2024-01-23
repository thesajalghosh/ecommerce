import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCart = ({ element, AddToCartHandeler }) => {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="product__card"
        // onClick={() => navigate(`/product/${e._id}`)}
      >
        <div className="product__card__image">
          <img
            src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${element._id}`}
            alt={element.slug}
          />
        </div>
        <div className="lower__part__product__card">
          <div className="lower__part__name">{element.name}</div>
          <div className="lower__part__name">{element.description}</div>
          <div className="lower__part__price__quantity">
            <div className="lower__part__price">Price : $ {element.price}</div>
            <div className="lower__part__price">
              In stock : {element.quantity}
            </div>
            <div className="d-flex card__buttons">
              <button
                className="btn btn-primary"
                onClick={() => navigate(`/product/${element._id}`)}
              >
                More Details
              </button>
              <button
                className="btn btn-primary"
                onClick={() => AddToCartHandeler(element)}
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCart;
