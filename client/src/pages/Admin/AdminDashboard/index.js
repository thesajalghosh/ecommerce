import React from "react";
import Layout from "../../../components/layout/Layout";
import "./index.css";

import { useSelector } from "react-redux";
import AdminMenu from "../../../components/AdminMenu";

const AdminDashboard = () => {
  return (
    <Layout>
      <div className="admin__dashboard__container">
        <div className="admin__menu__container">
          <AdminMenu />
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
