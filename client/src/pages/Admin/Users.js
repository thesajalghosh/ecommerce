import React from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";

const Users = () => {
  return (
    <>
      <Layout title={"Dashbaord - All User"}>
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            {" "}
            <h2>users</h2>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Users;
