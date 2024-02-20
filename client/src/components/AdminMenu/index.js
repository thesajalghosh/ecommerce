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
            to="/admin-dashboard/create-category"
            className="button__link"
          >
            Create Category
          </NavLink>
          <NavLink
            to="/admin-dashboard/create-product"
            className="button__link"
          >
            Create Product
          </NavLink>
          <NavLink to="/admin-dashboard/product" className="button__link">
            Products
          </NavLink>
          <NavLink to="/admin-dashboard/users" className="button__link">
            Users
          </NavLink>
          <NavLink to="/admin-dashboard/offer-create" className="button__link">
            Offfer Create
          </NavLink>
          <NavLink
            to="/admin-dashboard/offered-product"
            className="button__link"
          >
            Offfered Product
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default AdminMenu;
