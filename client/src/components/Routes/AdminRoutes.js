import axios from "axios";
import { useState, useEffect } from "react";
import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Spinner from "../spinner/Spinner";

const AdminRoute = () => {
  const token = useSelector((state) => state.auth.token);
  const [ok, setOk] = useState(false);

  useEffect(() => {
    const authCheck = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API}/api/v1/auth/admin-auth`,
          {
            headers: {
              authorization: token,
            },
            "Content-Type": "application/json",
          }
        );
        console.log("this is on admin route", res.data);
        if (res.data.ok) {
          setOk(true);
        } else {
          setOk(false);
        }
      } catch (error) {
        // Handle error, e.g., redirect to login page or show an error message
        console.error("Error occurred while checking authentication:", error);
        setOk(false);
      }
    };

    if (token) {
      authCheck();
    }
  }, [token]);

  return ok ? <Outlet /> : <Spinner path="" />;
};

export default AdminRoute;
