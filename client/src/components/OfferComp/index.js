import React from "react";
import "./index.css";
import CountdownTimer from "../CountDown";
import { IoMdArrowForward } from "react-icons/io";

const OfferComp = () => {
  return (
    <>
      <div className="today__offer__comp">
        <div className="today__offer__header__part">
          <div className="today__offer__left__part">
            Today's <span>Offer</span>
          </div>
          <div className="today__offer__right__part">
            view all <IoMdArrowForward />{" "}
          </div>
        </div>
        <div className="count__down__time__comp">
          <div className="count__down__time__comp__left">
            <div>DAILY</div>
            <div>DEAL</div>
            <span>Up to 70%</span>
          </div>
          <div className="count__down__time__comp__right">
            <div>Ends In</div>
            <CountdownTimer />
          </div>
        </div>
      </div>
    </>
  );
};

export default OfferComp;
