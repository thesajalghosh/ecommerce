import React, { useEffect, useState } from "react";
import "./index.css";
import Layout from "../../components/layout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ProductCart from "../../components/ProductCard";
import { setStoreCart } from "../../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { FaRupeeSign } from "react-icons/fa";
import { SiExpressvpn } from "react-icons/si";
import { TbMinusVertical } from "react-icons/tb";
import { FcLike } from "react-icons/fc";
import Loader from "../../components/Loader";
import { IoIosHeartEmpty } from "react-icons/io";

const BestSellerPage = () => {
  const [catProduct, setCatProduct] = useState([]);
  const [likeProduct, setLikeProduct] = useState([]);
  const [cart, setCart] = useState([]);
  const { cid } = useParams();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const getCategoryProduct = async () => {
    setLoading(true);
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/product/category-product/${cid}`
    );

    console.log(data.products);
    setCatProduct(data?.products);
    setLoading(false);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    getCategoryProduct();
  }, []);

  const unLikeHandeler = async (e) => {
    const newArray = likeProduct.filter((ele) => ele._id !== e._id);
    setLikeProduct(newArray);
    const res = await axios.put(
      `${process.env.REACT_APP_API}/api/v1/auth/unlike-product`,
      { lp: e._id },
      {
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
  };

  const likeProductHandeler = async (e) => {
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
    console.log(res);
  };
  return (
    <>
      <Layout>
        {loading ? (
          <Loader />
        ) : (
          <div className="category__product__page__whole__container">
            <div className="category__product__page__header">
              BestSeller {catProduct[0]?.name}
            </div>
            <div className="category__product__page__elements">
              {catProduct.map((e) => (
                <div
                  className="search__product__card"
                  onClick={() => navigate(`/product/${e._id}`)}
                  key={e._id}
                >
                  <div className="search__product__card__image">
                    <img src={e.url} alt={e.slug} />
                  </div>
                  <div className="search__lower__part__product__card">
                    <div className="search__lower__part__name">
                      {e.name.slice(0, 15)}{" "}
                      <IoIosHeartEmpty
                        size={20}
                        onClick={() => likeProductHandeler(e)}
                      />
                    </div>
                    <div className="search__lower__part__des">
                      {/* {textTranked(e.description)} */}
                      {e.description.slice(0, 20)}...
                    </div>
                    <div className="lower__part__price__quantity">
                      <div className="search__lower__part__price">
                        <FaRupeeSign />
                        {e.price}
                      </div>
                    </div>
                    <div className="express__delivery__section">
                      <div className="delivery__left">
                        <SiExpressvpn /> EXPRESS
                      </div>
                      <TbMinusVertical />
                      <div className="delivery__right">5 Day Delivery</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Layout>
    </>
  );
};

export default BestSellerPage;
