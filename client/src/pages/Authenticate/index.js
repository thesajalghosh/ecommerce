import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import "./index.css";
import Login from "../Auth/Login";
import Register from "../Auth/Register";

const Authenticate = () => {
  const [activePage, setActivePage] = useState("Login");
  return (
    <>
      <Layout>
        <div className="login__register__whole__container">
          <div className="login__register__page">
            <div className="auth__page__tab__change">
              <button
                className={
                  activePage === "Login" ? "active__tab" : "inactive__tab"
                }
                onClick={() => setActivePage("Login")}
              >
                Login
              </button>
              <button
                className={
                  activePage === "Register" ? "active__tab" : "inactive__tab"
                }
                onClick={() => setActivePage("Register")}
              >
                Register
              </button>
            </div>

            <div className="auth__page__whole__container">
              {activePage === "Login" && <Login />}
              {activePage === "Register" && <Register />}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Authenticate;
