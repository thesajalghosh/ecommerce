import React, { useEffect, useState } from "react";
import Layout from "../../../components/layout/Layout";
import "./index.css";
import { useParams } from "react-router-dom";
import axios from "axios";

const CreateOffer = () => {
  let { id } = useParams();
  const [product, setProduct] = useState([]);
  const [desp, setDesp] = useState(0);
  const [reason, setReason] = useState("");

  const SingleProductGet = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/product/get-product/${id}`
    );
    console.log(data.product[0]);
    if (data.success === true) {
      setProduct(data?.product[0]);
    }
  };

  const createOfferWithDis = async () => {
    const res = await axios.post(
      `${process.env.REACT_APP_API}/api/v1/offer/create-offer`,
      { id: product._id, desp: desp, reason: reason }
    );
  };

  useEffect(() => {
    SingleProductGet();
  }, []);
  return (
    <>
      <Layout>
        <div className="heading__discount__making__page">
          Making Offered Product
        </div>
        <div className="body__discount__page">
          <div className="discount__page__product__id">
            {" "}
            Product ID: {product._id}
          </div>
          <div className="body__discount__input">
            <label>How much percentage of offer you give?</label>
            <input
              placeholder="Enter percentage"
              value={desp}
              onChange={(e) => setDesp(e.target.value)}
            />
          </div>
          <div className="body__discount__input">
            <label>Give a description why you give offer</label>
            <input
              placeholder="Enter reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>
        </div>
        <div className="discount__page__button">
          <button onClick={() => createOfferWithDis()}>
            Create Offer Product
          </button>
        </div>
      </Layout>
    </>
  );
};

export default CreateOffer;
