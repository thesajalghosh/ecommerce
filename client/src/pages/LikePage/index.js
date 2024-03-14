import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import { useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { FaRupeeSign } from "react-icons/fa";
import { SiExpressvpn } from "react-icons/si";
import { TbMinusVertical } from "react-icons/tb";
import { IoIosHeartEmpty } from "react-icons/io";
import "./index.css";
import { FcLike } from "react-icons/fc";

const LikePage = () => {
  const [likeProduct, setLikeProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);

  const likeProductHendeler = async () => {
    setLoading(true);
    const { data } = await axios.post(
      `${process.env.REACT_APP_API}/api/v1/auth/user-get`,

      { _id: user.cid }
    );
    if (data.success) {
      setLikeProduct(data.user.lp);
    }
    setLoading(false);
  };

  useEffect(() => {
    likeProductHendeler();
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

  console.log(likeProduct);
  return (
    <Layout>
      <div className="like__page__whole__container">
        {loading ? (
          <Loader />
        ) : (
          <>
            {likeProduct.length === 0 ? (
              <div>No Product is found</div>
            ) : (
              <div className="all__result__whole__contianer">
                {likeProduct?.map((e) => (
                  <div
                    className="search__product__card"
                    // onClick={() => navigate(`/product/${e._id}`)}
                    key={e._id}
                  >
                    <div className="search__product__card__image">
                      <img src={e.url} alt={e.slug} />
                    </div>
                    <div className="search__lower__part__product__card">
                      <div className="search__lower__part__name">
                        {e.name.slice(0, 15)}{" "}
                        <FcLike size={20} onClick={() => unLikeHandeler(e)} />
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
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export default LikePage;
