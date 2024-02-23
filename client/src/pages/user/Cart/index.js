import React, { useEffect, useState } from "react";
import "./index.css";
import Layout from "../../../components/layout/Layout.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MdOutlineDelete } from "react-icons/md";
import { FaIndianRupeeSign, FaS } from "react-icons/fa6";
import { FaRupeeSign } from "react-icons/fa";
import { setRemoveCart, setStoreCart } from "../../../redux/cartSlice.js";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa";
import AddPayModal from "../../../components/AddPayModal/index.js";
import CardPage from "../../../components/CardPage/index.js";
import axios from "axios";

const Cart = () => {
  const cartData = useSelector((state) => state.cart.storeCart);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [price, setPrice] = useState(0);
  const [addPayPage, setAddPaypage] = useState(false);
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState(0);
  const [card, setCard] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(false);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const userGetFuntion = async () => {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/user-get`,
        { email: user.email }
      );
      console.log(data.user._id);
      setUserData(data.user);
    };
    userGetFuntion();
  }, []);
  // console.log(cartData);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleRadioButtonChange = (e) => {
    setSelectedOption(e.target.value);
    setPaymentMethod(e.target.value);
  };
  console.log(selectedOption);

  const handelProductRemove = (id) => {
    const removePrduct = cartData.filter(function (data) {
      return data._id === id;
    });
    setPrice(price - removePrduct[0].price);
    console.log(removePrduct[0]);
    const updatedProducts = cartData.filter(function (data) {
      return data._id !== id;
    });
    console.log("updatedProducts", updatedProducts);
    dispatch(setRemoveCart(updatedProducts));
  };
  console.log(cartData);

  useEffect(() => {
    let temp = 0;
    for (var i = 0; i < cartData.length; i++) {
      console.log(cartData[i]);
      temp = temp + cartData[i].price * cartData[i].buyqun;

      setPrice(temp);
    }
  }, []);

  const minusHandeler = (ele) => {
    console.log(ele);
    let withMinus = { ...ele, buyqun: ele.buyqun - 1 };

    let newUpdatedForMinus = cartData.map((ele) => {
      if (ele._id === withMinus._id) {
        return withMinus;
      }
      return ele;
    });
    dispatch(setStoreCart(newUpdatedForMinus));
    let temp = price - ele.price;
    setPrice(temp);
  };
  const plusHandeler = (ele) => {
    let withPlus = { ...ele, buyqun: ele.buyqun + 1 };

    let newUpdatedForPlus = cartData.map((ele) => {
      if (ele._id === withPlus._id) {
        return withPlus;
      }
      return ele;
    });
    dispatch(setStoreCart(newUpdatedForPlus));
    let temp = price + ele.price;
    setPrice(temp);
  };
  function getIdsFromCartdate(cartdate) {
    return cartdate.map((item) => item._id);
  }
  const handelfinalOrder = () => {
    let AllPides = getIdsFromCartdate(cartData);

    if (selectedOption === "cash") {
      const res = axios.post(
        `${process.env.REACT_APP_API}/api/v1/order/order-place`,
        {
          sloc: address,
          paymet: paymentMethod,
          totp: price,
          paysat: paymentStatus,
          pid: cartData,
          cid: userData._id,
        }
      );
      setCard(false);
    } else {
      setCard(true);
      setAddPaypage(false);
    }
  };
  const backFunction = () => {
    navigate(-1);
  };

  return (
    <>
      <Layout backFunction={backFunction}>
        {addPayPage === true ? (
          <AddPayModal
            setAddPayModal={setAddPaypage}
            setAddress={setAddress}
            setPaymentMethod={setPaymentMethod}
            handelfinalOrder={handelfinalOrder}
            handleRadioButtonChange={handleRadioButtonChange}
            selectedOption={selectedOption}
          />
        ) : (
          <>
            {card === true ? (
              <CardPage />
            ) : (
              <div className="cart__page__whole__container">
                {cartData.length === 0 ? (
                  <>
                    <div className="cart__with__no__element">
                      <span>Your Cart Is Filling Lonely</span>
                      <button onClick={() => navigate("/")}>
                        Start Shopping
                      </button>
                    </div>
                  </>
                ) : (
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
                      <div className="user__login__whole__container">
                        <div className="user__header__name">
                          Hi, {user.name.split(" ")[0]}
                        </div>
                      </div>
                    )}
                    <div className="cart__container__whole__container">
                      {cartData.map((e) => (
                        <>
                          <div className="cart__element__container" key={e._id}>
                            <div className="cart__element__left__part">
                              <img src={e.url} />
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
                              <div className="product__quantity__container">
                                <div className="product__quantity__increment__button__container">
                                  <button onClick={() => minusHandeler(e)}>
                                    <FaMinus />
                                  </button>
                                  <span>{e.buyqun}</span>
                                  <button onClick={() => plusHandeler(e)}>
                                    <FaPlus />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      ))}
                    </div>
                    <div className="cart__page__price__details">
                      <div className="price__details__heading">
                        PRICE DETAILS ({cartData.length})
                      </div>
                      <div className="price__details__price__part">
                        <div className="price__part__element">
                          <span>Total MRP</span>
                          <span>
                            <FaRupeeSign size={16} />
                            {price}
                          </span>
                        </div>
                        <div className="price__part__element">
                          <span>Platform Fee</span>
                          <span>
                            <FaRupeeSign size={16} />
                            20
                          </span>
                        </div>
                        <div className="price__part__element">
                          <span>Shipping Fee</span>
                          <span>FREE</span>
                        </div>
                      </div>
                    </div>
                    <div className="Place__order__button__container">
                      <button onClick={() => setAddPaypage(true)}>
                        Place Order
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </Layout>
    </>
  );
};

export default Cart;
