import React from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";

const CreateProduct = () => {
  return (
    <>
      <Layout title={"Dashboard - Create Product"}>
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            {" "}
            <h1>Create product</h1>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default CreateProduct;
