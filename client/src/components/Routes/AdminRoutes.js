import axios from "axios";
import { useState, useEffect } from "react";
import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Spinner from "../spinner/Spinner";

const AdminRoute = () => {
  const isAdmin = useSelector((state) => state.auth.isAdmin);

  return isAdmin ? <Outlet /> : <Spinner path="" />;
};

export default AdminRoute;
