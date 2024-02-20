import React from "react";
import Layout from "../../../components/layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { IoPersonCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../redux/authSlice";
import { FiLogOut } from "react-icons/fi";
import { MdAdminPanelSettings } from "react-icons/md";
import "./index.css";

const AdminProfile = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandeler = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("isAdmin");
    navigate("/auth-page");
  };
  const AdminHandeler = () => {
    navigate("/admin-dashboard/admin");
  };
  return (
    <Layout>
      <div className="profile__account__details__container">
        <div className="profile__account__details__container__upperPart">
          <div className="upper__part__icon">
            <IoPersonCircleOutline size={80} />
          </div>
          <div className="upper__part__user__details">
            <div className="upper__part__user__name">{user.name}</div>
            <span>{user.email}</span>
            <span>+91 {user.phone}</span>
          </div>
        </div>
        <div className="profile__account__details__container__lowerPart">
          <div className="lower__part__left">Address</div>
          <div className="lower__part__right">{user.address}</div>
        </div>
      </div>
      <div className="controller__routes__in__admin">
        <div
          className="profile__logout__container color__text"
          onClick={AdminHandeler}
        >
          <span>
            <MdAdminPanelSettings size={25} />
          </span>
          <div> Go TO Admin Dashboard</div>
        </div>
        <div className="profile__logout__container" onClick={logoutHandeler}>
          <span>
            <FiLogOut size={25} />
          </span>
          <div> Logout</div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminProfile;
