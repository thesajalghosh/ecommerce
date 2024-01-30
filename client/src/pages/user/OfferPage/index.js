import React, { useState } from "react";
import "./index.css";
import Layout from "../../../components/layout/Layout";
import { RxLapTimer } from "react-icons/rx";
import CountdownTimer from "../../../components/CountDown";

const OfferPage = () => {
  return (
    <>
      <Layout>
        <div className="photo__page__offer__container">
          <div className="offer__page__header">
            <span className="daily__deal__offer">Daily Deal</span>
            <div className="countdown__timer">
              <span>
                <RxLapTimer size={25} /> Ending In
              </span>
              <span>:</span>
              <span>
                <CountdownTimer />
              </span>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default OfferPage;
