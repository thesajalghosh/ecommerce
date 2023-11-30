import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";
import { toast } from "react-toastify";
import { AiFillCaretDown } from "react-icons/ai";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    toast.success("Logout Successfully");
  };
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  // console.log(user);
  return (
    <>
      <div className="whole__navbar">
        <div className="company__icon">Icon</div>
        <div className="navbar__links">
          <NavLink to="/" activeClassName="active">
            Home
          </NavLink>
          <NavLink to="/category" activeClassName="active">
            Categories
          </NavLink>
          {!user ? (
            <>
              <NavLink to="/register" activeClassName="active">
                Register
              </NavLink>
              <NavLink to="/login" activeClassName="active">
                Login
              </NavLink>
            </>
          ) : (
            <>
              <div className="custom-dropdown">
                <button className="btn" onClick={toggleDropdown}>
                  {user && <>{user.name}</>} <AiFillCaretDown />
                </button>
                {isDropdownOpen && (
                  <div className="dropdown-menus">
                    <NavLink
                      to={`/dashboard/${user.role === 1 ? "admin" : "user"}`}
                      className="dropdown-items"
                    >
                      Dashboard
                    </NavLink>
                    <NavLink
                      to="/login"
                      activeClassName="active"
                      onClick={handleLogout}
                    >
                      Logout
                    </NavLink>
                  </div>
                )}
              </div>
            </>
          )}

          <NavLink to="/cart" activeClassName="active">
            Cart (0)
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Header;

{
  /* <NavLink to="/register" activeClassName="active">
Register
</NavLink>
<NavLink to="/login" activeClassName="active">
Login
</NavLink> */
}
