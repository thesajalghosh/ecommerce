import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import "./index.css";
import { FaRupeeSign } from "react-icons/fa";
import ProductCard from "../../components/ProductCard";
import { FaElementor } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { setStoreCart } from "../../redux/cartSlice";
import { SiExpressvpn } from "react-icons/si";
import { TbMinusVertical } from "react-icons/tb";
import { FaRegHeart } from "react-icons/fa";
import { FcLike } from "react-icons/fc";

const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const params = useParams();
  const [relatedProduct, setRelatedProduct] = useState([]);
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const dispatch = useDispatch();
  const storeCart = useSelector((state) => state.cart.storeCart);
  const token = useSelector((state) => state.auth.token);
  const [Liked, setLiked] = useState(false);
  const [likedProduct, setLikedProduct] = useState([]);
  const user = useSelector((state) => state.auth.user);

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
    console.log(storeCart);
    console.log(cartProduct);
    let existingItem = storeCart?.find((ele) => ele._id === cartProduct._id);
    // console.log("existingItem", existingItem);
    if (existingItem) {
      console.log("exist item");
      let newExistItem = { ...existingItem, buyqun: existingItem.buyqun + 1 };
      console.log("existingItem", newExistItem);
      console.log(storeCart);
      let newUpdatedExistingItem = storeCart.map((ele) => {
        if (ele._id === newExistItem._id) {
          return newExistItem;
        }
        return ele;
      });
      console.log("first", newUpdatedExistingItem);
      dispatch(setStoreCart(newUpdatedExistingItem));
    } else {
      // console.log("not exist item");
      let quantityAdd = { ...cartProduct, buyqun: 1 };
      // console.log("quantityAdd", quantityAdd);
      let newAddItemWithPrevious = [...storeCart, quantityAdd];
      // console.log("newAddItemWithPevioue", newAddItemWithPrevious);
      dispatch(setStoreCart(newAddItemWithPrevious));
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

  const likeProductHandeler = async (e) => {
    setLiked(true);
    console.log(e);

    const res = await axios.put(
      `${process.env.REACT_APP_API}/api/v1/auth/add-like-product`,
      { lp: e._id },
      {
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
  };

  const likeProductArray = async () => {
    if (user) {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/user-get`,

        { _id: user.cid }
      );

      if (data.success) {
        setLikedProduct(data.user.lp);
      }
    }
  };

  useEffect(() => {
    likeProductArray();
  }, []);
  useEffect(() => {
    console.log(likedProduct);
    console.log(product._id);
    let existOrNot = likedProduct.some((pro) => pro._id === product?._id);
    console.log(existOrNot);
    setLiked(existOrNot);
  }, [likedProduct]);

  return (
    <>
      <div>
        {product && (
          <Layout>
            <div className="product__details__whole__container">
              <div className="product__detail__main__product">
                <div className="product__details__image">
                  <img src={product.url} alt={product.name} />
                </div>
                <div className="product__name__header">{product?.name}</div>
                <div className="product__description__subheader">
                  {product?.description?.slice(0, 120)}...
                </div>
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
              <div className="express__delivery__section">
                <div className="delivery__left__part">
                  <SiExpressvpn size={20} /> EXPRESS
                </div>
                <TbMinusVertical size={27} />
                <div className="delivery__right__part">5 Day Delivery</div>
              </div>
              <div className="buy__now__add__to__cart__button">
                <button
                  className="buy"
                  onClick={() => likeProductHandeler(product)}
                >
                  {" "}
                  {Liked ? <FcLike size={25} /> : <FaRegHeart size={25} />}
                  Watchlist
                </button>
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
                    <div className="oneof__the__top__product" key={ele._id}>
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
