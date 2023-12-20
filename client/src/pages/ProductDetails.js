import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const params = useParams();

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product/${params.id}`
      );
      setProduct(data?.product);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params.id) getProduct();
  }, []);

  console.log(product);

  return <></>;
};

export default ProductDetails;
