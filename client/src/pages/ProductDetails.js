import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/layout/Layout";
import "./index.css";

const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const params = useParams();
  const [relatedProduct, setRelatedProduct] = useState([]);
  const navigate = useNavigate();

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product/${params.id}`
      );
      if (data) {
        setProduct(data?.product[0]);
        getSimilarProduct(data?.product[0]._id, data?.product[0].category._id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/related-product/${pid}/${cid}`
      );

      if (data) {
        setRelatedProduct(data?.products);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params.id) getProduct();
  }, [params.id]);

  console.log(relatedProduct);

  return (
    <>
      <div>
        {product && (
          <Layout>
            <div className="row container">
              <div className="col-md-5">
                <img
                  src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
                  alt={product.name}
                />
              </div>
              <div className="col-md-5">
                <h1>Product details</h1>
                <h2>Name : {product?.name}</h2>
                <h2>Category : {product?.category?.name}</h2>
                <h2>Description : {product?.description}</h2>
                <h2>Price : {product?.price}</h2>
                <h2>Quantity : {product?.quantity}</h2>
                <button className="btn btn-primary">Add to cart</button>
              </div>
            </div>
            <hr />
            <div className="row similar__product__container">
              <h1>Similar Product</h1>
              {relatedProduct.length < 1 && <p>No Similar Product Found</p>}
              <div className="similar__product__every__product">
                {relatedProduct?.map((e) => (
                  <>
                    <div
                      className="product__card"
                      // onClick={() => navigate(`/product/${e._id}`)}
                    >
                      <div className="product__card__image">
                        <img
                          src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${e._id}`}
                          alt={e.slug}
                        />
                      </div>
                      <div className="lower__part__product__card">
                        <div className="lower__part__name">{e.name}</div>
                        <div className="lower__part__name">{e.description}</div>
                        <div className="lower__part__price__quantity">
                          <div className="lower__part__price">
                            Price : $ {e.price}
                          </div>
                          <div className="lower__part__price">
                            In stock : {e.quantity}
                          </div>
                          <div className="d-flex card__buttons">
                            <button
                              className="btn btn-primary"
                              onClick={() => navigate(`/product/${e._id}`)}
                            >
                              More Details
                            </button>
                            <button className="btn btn-primary">
                              Add to cart
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ))}
              </div>
            </div>
          </Layout>
        )}
      </div>
    </>
  );
};

export default ProductDetails;
