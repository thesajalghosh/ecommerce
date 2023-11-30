import React from "react";
import { NavLink } from "react-router-dom";
const AdminMenu = () => {
  return (
    <>
      <div className="sidebar__admin__panal">
        <ul className="list-group">
          <h4>Admin Panel</h4>
          <NavLink
            to="/dashboard/admin/create-category"
            className="list-group-item"
          >
            Create Category
          </NavLink>
          <NavLink
            to="/dashboard/admin/create-product"
            className="list-group-item"
          >
            Create Product
          </NavLink>
          <NavLink to="/dashboard/admin/product" className="list-group-item">
            Products
          </NavLink>
          <NavLink to="/dashboard/admin/users" className="list-group-item">
            Users
          </NavLink>
        </ul>
      </div>
    </>
  );
};

export default AdminMenu;
