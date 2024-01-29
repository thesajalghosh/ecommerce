import React, { useEffect, useState } from "react";
import Layout from "../../../components/layout/Layout";
import axios from "axios";

const OfferedProduct = () => {
  const [offeredProduct, setOfferedProduct] = useState([]);

  const allOfferedProduct = async (req, res) => {
    try {
      const products = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/offer/get-all-offer-product`
      );

      console.log(products);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    allOfferedProduct();
  });
  return (
    <>
      <Layout>
        <div className="offered__product__whole__container">
          <div className="offered__product__header">
            All Offered Product List
          </div>
          <div className="offered__product__all__product"></div>
        </div>
      </Layout>
    </>
  );
};

export default OfferedProduct;
