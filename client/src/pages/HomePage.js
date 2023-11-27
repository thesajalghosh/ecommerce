import React from "react";
import Layout from "../components/layout/Layout";
import { useSelector } from "react-redux";
const HomePage = () => {
  const user = useSelector((state) => state.auth.user);
  console.log(user);

  return (
    <Layout>
      <h1>home page</h1>
    </Layout>
  );
};

export default HomePage;
