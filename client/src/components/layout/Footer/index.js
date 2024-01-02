import React from "react";
import "./index.css";
import { GoHome } from "react-icons/go";
import { BiCategoryAlt } from "react-icons/bi";
import { IoBagCheckOutline } from "react-icons/io5";

const Footer = () => {
  return (
    <div className="whole__page__footer">
      <div className="whole__page__footer__icon">
        <div className="footer__page__tab">
          <GoHome size={25} />
        </div>
        <div className="footer__page__tab">
          <BiCategoryAlt size={25} />
        </div>
        <div className="footer__page__tab">
          <IoBagCheckOutline size={25} />
        </div>
      </div>
    </div>
  );
};

export default Footer;
