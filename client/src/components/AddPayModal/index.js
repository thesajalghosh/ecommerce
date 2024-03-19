import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import "./index.css";
import axios from "axios";
import { useSelector } from "react-redux";

const AddPayModal = ({
  setAddPayModal,
  handelfinalOrder,
  handleRadioButtonChange,
  selectedOption,
  setAddress,
  address,
}) => {
  const userInfo = useSelector((state) => state.auth.user);
  const [user, setUser] = useState();
  const [addType, setAddType] = useState("prev");
  const [inType, setInType] = useState(false);

  const getuser = async () => {
    const { data } = await axios.post(
      `${process.env.REACT_APP_API}/api/v1/auth/user-get`,

      { _id: userInfo.cid }
    );

    if (data.success) {
      setUser(data.user);
      setAddress(data.user.address);
    } else {
      console.log("error in the api");
    }
  };

  const handelButtonChange = (e) => {
    setAddType(e.target.id);
    if (e.target.id === "new") {
      setInType(true);
    } else if (e.target.id === "prev") {
      setInType(false);
    }
  };

  useEffect(() => {
    getuser();
  }, []);

  console.log(user);

  return (
    <Layout>
      <div className="address__payment__modal__whole__contianer">
        <div className="add__details__container">
          <div className="Add__address__header"> Select a delivery address</div>
          <div className="add__address__whole__container">
            <div className="add__address__ele ">
              <button
                className={
                  addType === "prev" ? "active__button" : "inactive__button"
                }
                onClick={handelButtonChange}
                id="prev"
              ></button>
              <div className="name__with__address">
                <span>{user?.name}</span>
                <div>{user?.address}</div>
              </div>
            </div>
            <div className="add__address__ele__input">
              <div className="add__address__ele__upper">
                <button
                  className={
                    addType === "new" ? "active__button" : "inactive__button"
                  }
                  onClick={handelButtonChange}
                  id="new"
                ></button>
                <div className="add__new__address">Add New Address</div>
              </div>
              {inType && (
                <div className="add__address__ele__lower">
                  <div className="add__input">
                    <input
                      value={address}
                      placeholder="Enter Address"
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="select__payment__method__container">
          <div className="select__address__payment__page">
            {" "}
            Select Payment Method
          </div>
          <button
            value={"cash"}
            className={
              selectedOption === "cash"
                ? `payment__method__container__active`
                : `payment__method__container`
            }
            onClick={handleRadioButtonChange}
          >
            Cash On Delivery
          </button>
          <button
            value={"credit"}
            className={
              selectedOption === "credit"
                ? `payment__method__container__active`
                : `payment__method__container`
            }
            onClick={handleRadioButtonChange}
          >
            By Credit Card
          </button>
          <button
            value={"debit"}
            className={
              selectedOption === "debit"
                ? `payment__method__container__active`
                : `payment__method__container`
            }
            onClick={handleRadioButtonChange}
          >
            By Debit Card
          </button>
        </div>
        <div className="payment__page__button__container">
          <button
            className="payment__Page__order__button"
            onClick={handelfinalOrder}
          >
            Save And Order
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default AddPayModal;
