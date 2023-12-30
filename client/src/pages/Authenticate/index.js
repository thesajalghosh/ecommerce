import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import "./index.css";

const Authenticate = () => {
  const [activePage, setActivePage] = useState("Login");
  return (
    <>
      <Layout>
        <div className="auth__page__tab__change">
          <button
            className={activePage === "Login" ? "active__tab" : "inactive__tab"}
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
      </Layout>
    </>
  );
};

export default Authenticate;
