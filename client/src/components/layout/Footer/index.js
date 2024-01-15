import React from "react";
import "./index.css";
import { GoHome } from "react-icons/go";
import { BiCategoryAlt } from "react-icons/bi";
import { IoBagCheckOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Footer = () => {
  const navigate = useNavigate();
  const cartProduct = useSelector((state) => state.cart.storeCart);

  return (
    <div className="whole__page__footer">
      <div className="whole__page__footer__icon">
        <div className="footer__page__tab">
          <GoHome size={25} onClick={() => navigate("/")} />
        </div>
        <div className="footer__page__tab">
          <BiCategoryAlt size={25} />
        </div>
        <div className="footer__page__tab" onClick={() => navigate("/cart")}>
          <IoBagCheckOutline size={25} />
          {cartProduct?.length}
        </div>
      </div>
    </div>
  );
};

export default Footer;
