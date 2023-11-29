import React from "react";
import "./Modal.css";
import { RxCross2 } from "react-icons/rx";

const Modal = ({ heading, body, footer, setClose }) => {
  return (
    <>
      <div className="modal__container__whole">
        <div className="modal__container">
          <div className="modal__heading">
            <span>{heading}</span>
            <span onClick={() => setClose(false)}>
              <RxCross2 />
            </span>
          </div>
          <div className="modal__body__content">{body}</div>
          <div className="modal__footer">{footer}</div>
        </div>
      </div>
    </>
  );
};

export default Modal;
