import React, { useEffect, useState } from "react";
import Layout from "../../../components/layout/Layout";
import axios from "axios";
import { FaRupeeSign } from "react-icons/fa";
import "./index.css";

const OfferedProduct = () => {
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
  console.log(offeredProduct);
  return (
    <>
      <Layout>
        <div className="offered__product__whole__container">
          <div className="offered__product__header">
            All Offered Product List
          </div>
          <div className="offered__product__all__product">
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
                      <button className="edit__button">Edit</button>
                      <button className="delete__button">Delete</button>
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

export default OfferedProduct;
