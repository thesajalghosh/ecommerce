import React, { useEffect, useState } from "react";
import "./index.css";
import Layout from "../../../components/layout/Layout";
import { RxLapTimer } from "react-icons/rx";
import CountdownTimer from "../../../components/CountDown";
import axios from "axios";
import { FaRupeeSign } from "react-icons/fa";

const OfferPage = () => {
  const [offeredProduct, setOfferedProduct] = useState([]);

  const allOfferedProduct = async (req, res) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/offer/get-all-offer-product`
      );
      setOfferedProduct(data?.offeredProduct);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    allOfferedProduct();
  }, []);
  return (
    <>
      <Layout>
        <div className="photo__page__offer__container">
          <div className="offer__page__header">
            <span className="daily__deal__offer">Daily Deal</span>
            <div className="countdown__timer">
              <span>
                <RxLapTimer size={25} /> Ending In
              </span>
              <span>:</span>
              <span>
                <CountdownTimer />
              </span>
            </div>
          </div>
          <div className="offer__page__all__product__element">
            {offeredProduct.map((ele) => (
              <div className="offered__product__element" key={ele._id}>
                <div className="element__left__part">
                  <img src={ele.url} />
                </div>
                <div className="element__right__part">
                  <div className="right__product__name">{ele.name}</div>
                  <div className="right__product__price">
                    <span className="discount__price">
                      <FaRupeeSign size={18} />{" "}
                      {ele.price - ele.price * (ele.disp / 100)}
                    </span>
                    <span className="original__price">
                      {" "}
                      <span className="original__price__left">
                        <FaRupeeSign size={15} />
                        {ele.price}
                      </span>
                      <span className="discounted__percentage">
                        {" "}
                        {ele.disp}%
                      </span>
                    </span>
                    <span className="edit__delete__button">
                      <button className="add__to__cart__button">
                        Add to card
                      </button>
                      <button className="buy__now__button">Buy Now</button>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default OfferPage;
