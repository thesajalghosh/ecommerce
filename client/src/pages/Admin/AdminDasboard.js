import React from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import { useSelector } from "react-redux";

const AdminDasboard = () => {
  const user = useSelector((state) => state.auth.user);
  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card"> Admin Name: {user.name}</div>
            <div className="card"> Admin Email: {user.email}</div>
            <div className="card"> Admin Phone N0. {user.phone}</div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDasboard;
