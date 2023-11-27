import React from "react";
import Layout from "../../components/layout/Layout";
import UserMenu from "../../components/layout/UserMenu";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <Layout title={"Dashboard"}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-3">
            <div className="card">User Name: {user.name}</div>
            <div className="card">User Email: {user.email}</div>
            <div className="card">User Phone: {user.phone}</div>
            <div className="card">USer Address: {user.address}</div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
