import React from "react";
import useCategory from "../hooks/useCategory";
import Layout from "../components/layout/Layout";
import "./index.css";

const Categories = () => {
  const categories = useCategory();
  return (
    <>
      <Layout>
        <div className="categories__whole__container">
          {categories.map((e) => (
            <div className="categories__element">{e.name}</div>
          ))}
        </div>
      </Layout>
    </>
  );
};

export default Categories;
