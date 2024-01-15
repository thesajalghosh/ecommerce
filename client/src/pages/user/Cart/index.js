import React from "react";
import "./index.css";
import Layout from "../../../components/layout/Layout.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MdOutlineDelete } from "react-icons/md";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { setStoreCart } from "../../../redux/cartSlice.js";

const Cart = () => {
  const cartData = useSelector((state) => state.cart.storeCart);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(cartData);

  const handelProductRemove = (id) => {
    const updatedProducts = cartData.filter(function (data) {
      return data._id !== id;
    });
    dispatch(setStoreCart(updatedProducts));
  };
  return (
    <>
      <Layout>
        <div className="cart__page__whole__container">
          {cartData.length === 0 ? (
            <>
              <div className="cart__with__no__element">
                <span>Your Cart Is Filling Lonely</span>
                <button onClick={() => navigate("/")}>Start Shopping</button>
              </div>
            </>
          ) : (
            <>
              <div className="cart__with__element">
                <div className="user__name__cart__owner"></div>
                {!user ? (
                  <>
                    <div className="user__not__login">
                      <span>You Are Not Login or Register Yet, please</span>
                      <div>
                        <button onClick={() => navigate("/auth-page")}>
                          Login
                        </button>
                        <button onClick={() => navigate("/auth-page")}>
                          Register
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="user__login__whole__container">
                      <div className="user__header__name">
                        Hi, {user.name.split(" ")[0]}
                      </div>
                      <div className="cart__container__whole__container">
                        {cartData.map((e) => (
                          <>
                            <div className="cart__element__container">
                              <div className="cart__element__left__part">
                                <img
                                  src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${e._id}`}
                                />
                              </div>
                              <div className="cart__element__right__part">
                                <div className="product__name__remove">
                                  <span>{e.name}</span>
                                  <span>
                                    <MdOutlineDelete
                                      size={25}
                                      onClick={() => handelProductRemove(e._id)}
                                    />
                                  </span>
                                </div>
                                <div className="product__price">
                                  <FaIndianRupeeSign />
                                  {e.price}
                                </div>
                              </div>
                            </div>
                          </>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </Layout>
    </>
  );
};

export default Cart;
