import React, { useEffect, useState } from "react";
import "./index.css";
import Layout from "../../../components/layout/Layout";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess, setIsAdmin } from "../../../redux/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/login`,
        { email, password }
      );

      const userData = {
        user: res.data.user,
        token: res.data.token,
      };
      console.log(res);
      if (res.data.success === false) {
        setError(true);
      }
      // console.log(userData);
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("token", JSON.stringify(res.data.token));

        if (res.data.user.role === 1) {
          localStorage.setItem("isAdmin", true);
          dispatch(setIsAdmin(true));
        } else {
          localStorage.setItem("isAdmin", false);
          dispatch(setIsAdmin(false));
        }
        dispatch(loginSuccess(userData));
        // navigate(location.state || "/");
        navigate("/");
      }
    } catch (error) {
      console.log(error);

      toast.error("Something went wrong");
    }
  };
  console.log(error);

  return (
    <form className="whole__form__container" onSubmit={handleSubmit}>
      <div className="whole__form">
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            required
          />
        </div>
        {error && (
          <div className="login__error">Error: Login or Password is wrong</div>
        )}
        <div
          className="forgot__password"
          onClick={() => {
            navigate("/forgot-password");
          }}
        >
          {" "}
          Forgot Password
        </div>
        <div className="button__contianer">
          <button type="submit" className="ecommerce__but__design">
            Login
          </button>
        </div>
      </div>
    </form>
  );
};

export default Login;
