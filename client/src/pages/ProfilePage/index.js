import React from "react";
import "./index.css";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const user = useSelector((state) => state.auth.user);

  console.log(user);

  return <div>Profile</div>;
};

export default ProfilePage;
