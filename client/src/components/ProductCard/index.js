import React from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import { FaIndianRupeeSign } from "react-icons/fa6";

const ProductCard = ({
  element,
  AddToCartHandeler,
  offerCreateButton,
  setOfferCreateModal,
}) => {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="product__card"
        // onClick={() => navigate(`/product/${e._id}`)}
        key={element._id}
      >
        <div className="product__card__image">
          <img src={element.url} alt={element.slug} />
        </div>
        <div className="lower__part__product__card">
          <div className="lower__part__upper__part__whole__content">
            <div className="lower__part__left__side">
              <div className="lower__part__name">{element.name}</div>
              <div className="lower__part__price">
                <FaIndianRupeeSign size={21} /> {element.price}
              </div>
            </div>
            <div className="lower__part__right__side">
              <div className="total__number__product__in__stock">
                {element.quantity} only in Stock
              </div>
            </div>
          </div>
          <div className="lower__part__description">{element.description}</div>
          <div className="lower__part__price__quantity">
            {offerCreateButton === true ? (
              <>
                <div className="create__offer__button__container">
                  <button
                    className="create__offer__button"
                    onClick={() =>
                      navigate(`/dashboard/admin/create-offer/${element._id}`)
                    }
                  >
                    Create Offer
                  </button>
                </div>
              </>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
