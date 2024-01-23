import React from "react";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/authSlice";
import Layout from "../../../components/layout/Layout";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { IoPersonCircleOutline } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import { MdUpdate } from "react-icons/md";
const ProfilePage = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(user);

  const logoutHandeler = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/auth-page");
  };
  const AdminHandeler = () => {
    navigate("/dashboard/admin");
  };

  return (
    <>
      <Layout>
        <div className="profile__whole__container">
          <div className="profile__account__back__button">
            <span>
              <MdOutlineKeyboardBackspace
                size={28}
                onClick={() => navigate(-1)}
              />
            </span>
            <span className="page__name__my__account">My Account</span>
          </div>

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
          <div className="profile__update__container" onClick={logoutHandeler}>
            <span>
              <MdUpdate size={25} />
            </span>
            <div> Update Profile</div>
          </div>
          <div className="profile__logout__container" onClick={logoutHandeler}>
            <span>
              <FiLogOut size={25} />
            </span>
            <div> Logout</div>
          </div>
          {user.role === 1 && (
            <div className="profile__logout__container" onClick={AdminHandeler}>
              <span>
                <FiLogOut size={25} />
              </span>
              <div> Go TO Admin Dashboard</div>
            </div>
          )}
        </div>
      </Layout>
    </>
  );
};

export default ProfilePage;
