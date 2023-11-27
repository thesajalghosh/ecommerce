import React from "react";
import { NavLink } from "react-router-dom";

const UserMenu = () => {
  return (
    <div>
      <div className="sidebar__admin__panal">
        <ul className="list-group">
          <h4>User Dashboard</h4>
          <NavLink to="/dashboard/user/profile" className="list-group-item">
            Profile
          </NavLink>
          <NavLink to="/dashboard/user/orders" className="list-group-item">
            User Orders
          </NavLink>
        </ul>
      </div>
    </div>
  );
};

export default UserMenu;
