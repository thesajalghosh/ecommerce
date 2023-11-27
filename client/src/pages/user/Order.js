import React from "react";
import Layout from "../../components/layout/Layout";
import UserMenu from "../../components/layout/UserMenu";

const Order = () => {
  return (
    <>
      <Layout title={"Dashboard - Orders Page"}>
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h2> All order</h2>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Order;
