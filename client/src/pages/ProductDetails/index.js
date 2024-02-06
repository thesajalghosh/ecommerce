import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import "./index.css";
import { FaRupeeSign } from "react-icons/fa";
import ProductCard from "../../components/ProductCard";
import { FaElementor } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { setStoreCart } from "../../redux/cartSlice";

const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const params = useParams();
  const [relatedProduct, setRelatedProduct] = useState([]);
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const dispatch = useDispatch();

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
  const AddToCartHandeler = (cartProduct) => {
    let cartVal = [...cart, cartProduct];
    setCart(cartVal);
    dispatch(setStoreCart(cartProduct));
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

  console.log(product);

  return (
    <>
      <div>
        {product && (
          <Layout>
            <div className="product__details__whole__container">
              <div className="product__name__header">{product?.name}</div>
              <div className="product__description__subheader">
                {product?.description}
              </div>
              <div className="product__details__image">
                <img src={product.url} alt={product.name} />
              </div>
              {product.desP > 0 ? (
                <>
                  <div className="price__container__whole">
                    <div className="discounted__price">
                      <FaRupeeSign size={20} />
                      {product.price - (product.price * product.desP) / 100}
                    </div>
                    <div className="orginal__price">
                      <FaRupeeSign size={12} />
                      {product.price}
                    </div>
                    <div className="discounted__percentage">
                      {product.desP}%
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="price__container__whole">
                    <FaRupeeSign /> {product.price}
                  </div>
                </>
              )}
              <div className="product__available__count">
                {product.quantity} only left
              </div>
              <div className="buy__now__add__to__cart__button">
                <button className="buy">Buy Now</button>
                <button
                  className="cart"
                  onClick={() => AddToCartHandeler(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
            <hr />
            <div className="similar__product__container">
              <h1>Similar Product</h1>
              {relatedProduct.length < 1 && <p>No Similar Product Found</p>}
              <div className="similar__product__every__product">
                {relatedProduct?.map((ele) => (
                  <>
                    <div className="oneof__the__top__product">
                      <div className="offered__product__element" key={ele._id}>
                        <div className="element__left__part">
                          <img src={ele.url} />
                        </div>
                        <div className="element__right__part">
                          <div className="right__product__name">{ele.name}</div>
                          <div className="right__product__price">
                            <span className="discount__price">
                              <FaRupeeSign size={18} />{" "}
                              {FaElementor.price - ele.price * (ele.desP / 100)}
                            </span>
                            <span className="original__price">
                              {" "}
                              <span className="original__price__left">
                                <FaRupeeSign size={15} />
                                {ele.price}
                              </span>
                              <span className="discounted__percentage">
                                {" "}
                                {ele.desP}%
                              </span>
                            </span>
                            <span className="edit__delete__button">
                              <button
                                className="addto__cart__button"
                                onClick={() => AddToCartHandeler(ele)}
                              >
                                Add to Cart
                              </button>
                            </span>
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
