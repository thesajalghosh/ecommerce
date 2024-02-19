import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, setSideBar } from "../../../redux/authSlice";
import { toast } from "react-toastify";
import { AiFillCaretDown } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import useCategory from "../../../hooks/useCategory";
import { IoMenu } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { IoBagCheckOutline } from "react-icons/io5";
import { IoArrowBack } from "react-icons/io5";
import "./index.css";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [iscategoryOpen, setiscategoryOpen] = useState(false);
  const token = localStorage.getItem("token");

  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    toast.success("Logout Successfully");
  };
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const categoryDropdown = () => {
    setiscategoryOpen(!iscategoryOpen);
  };
  const category = useCategory();
  // console.log(user);

  const profilehandeler = () => {
    if (token) {
      navigate("/dashboard/user/profile");
    } else {
      navigate("/auth-page");
    }
  };

  const handelSideBar = () => {
    dispatch(setSideBar(true));
  };

  const handelBackbutton = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="whole__navbar">
        {window.location.pathname === "/" ? (
          <>
            {" "}
            <div className="navbar__left__part">
              <div className="navbar__left__menu">
                <IoMenu size={25} onClick={handelSideBar} />
              </div>
              <div className="navbar__left__company__name">Acom</div>
            </div>
          </>
        ) : (
          <>
            <div className="back__button__container">
              <IoArrowBack onClick={handelBackbutton} size={25} />
            </div>
          </>
        )}

        <div className="navbar__right__part">
          <div
            className="navbar__left__search"
            onClick={() => navigate("/search")}
          >
            <IoIosSearch size={25} />
          </div>
          <div className="navbar__left__search" onClick={profilehandeler}>
            <CgProfile size={25} />
          </div>
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

{
  /* <div className="navbar__links">
<NavLink to="/" activeClassName="active">
  Home
</NavLink>
<div className="custom-dropdown">
  <button className="btn" onClick={categoryDropdown}>
    Categories <AiFillCaretDown />
  </button>

  {iscategoryOpen && (
    <div className="dropdown-menus" to="">
      <Link className="dropdown-items" to="/all-categories">
        {" "}
        All Categories
      </Link>
      {category.map((e) => (
        <Link
          className="dropdown-items"
          to={`/category/${e._id}`}
          key={e._id}
        >
          {e.name}
        </Link>
      ))}
    </div>
  )}
</div>

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
<NavLink to="/search">
  <FaSearch />
</NavLink>
</div> */
}
