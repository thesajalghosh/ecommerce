import React, { useEffect, useState } from "react";
import "./index.css";
import CountdownTimer from "../CountDown";
import { IoMdArrowForward } from "react-icons/io";
import axios from "axios";
import { FaRupeeSign } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const OfferComp = () => {
  const [offeredProduct, setOfferedProduct] = useState([]);
  const navigate = useNavigate();
  const allOfferedProduct = async (req, res) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/offer/get-all-offer-product`
      );
      setOfferedProduct(data?.offeredProduct[0]);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    allOfferedProduct();
  }, []);
  return (
    <>
      <div className="today__offer__comp">
        <div className="today__offer__header__part">
          <div className="today__offer__left__part">
            Today's <span>Offer</span>
          </div>
          <div
            className="today__offer__right__part"
            onClick={() => navigate("/offer-page")}
          >
            view all <IoMdArrowForward />{" "}
          </div>
        </div>
        <div className="count__down__time__comp">
          <div className="count__down__time__comp__left">
            <div>DAILY</div>
            <div>DEAL</div>
            <span>Up to 70%</span>
          </div>
          <div className="count__down__time__comp__right">
            <div>Ends In</div>
            <CountdownTimer />
          </div>
        </div>
        <div className="oneof__the__top__product">
          <div className="offered__product__element" key={offeredProduct._id}>
            <div className="element__left__part">
              <img src={offeredProduct.url} />
            </div>
            <div className="element__right__part">
              <div className="right__product__name">{offeredProduct.name}</div>
              <div className="right__product__price">
                <span className="discount__price">
                  <FaRupeeSign size={18} />{" "}
                  {offeredProduct.price -
                    offeredProduct.price * (offeredProduct.disp / 100)}
                </span>
                <span className="original__price">
                  {" "}
                  <span className="original__price__left">
                    <FaRupeeSign size={15} />
                    {offeredProduct.price}
                  </span>
                  <span className="discounted__percentage">
                    {" "}
                    {offeredProduct.disp}%
                  </span>
                </span>
                <span className="edit__delete__button">
                  <button className="addto__cart__button">Add to Cart</button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OfferComp;
