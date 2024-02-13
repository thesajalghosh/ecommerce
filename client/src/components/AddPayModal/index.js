import React, { useState } from "react";
import Layout from "../layout/Layout";
import "./index.css";

const AddPayModal = ({
  setAddPayModal,
  handelfinalOrder,
  handleRadioButtonChange,
  selectedOption,
  setAddress,
  address,
}) => {
  return (
    <Layout>
      <div className="address__payment__modal__whole__contianer">
        <div className="add__details__container">
          <div className="Add__address__header"> Add address</div>
          <div className="add__input">
            <input
              value={address}
              placeholder="Enter Address"
              onChange={(e) => setAddress(e.target.value)}
            />
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
