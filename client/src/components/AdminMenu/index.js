import React from "react";
import { NavLink } from "react-router-dom";
import "./index.css";
const AdminMenu = () => {
  return (
    <>
      <div className="admin__panal__whole__container">
        <div className="admin__panel__heading">Admin Panel</div>
        <div className="admin__panel__all__button">
          <NavLink
            to="/dashboard/admin/create-category"
            className="button__link"
          >
            Create Category
          </NavLink>
          <NavLink
            to="/dashboard/admin/create-product"
            className="button__link"
          >
            Create Product
          </NavLink>
          <NavLink to="/dashboard/admin/product" className="button__link">
            Products
          </NavLink>
          <NavLink to="/dashboard/admin/users" className="button__link">
            Users
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default AdminMenu;
