import React from "react";
import useCategory from "../hooks/useCategory";
import Layout from "../components/layout/Layout";
import "./index.css";
import { Link } from "react-router-dom";

const Categories = () => {
  const categories = useCategory();
  return (
    <>
      <Layout title="ALL Categories">
        <h1> All Categories</h1>
        <div className="categories__whole__container">
          {categories.map((e) => (
            <Link to={`/category/${e._id}`} key={e._id}>
              <button className="categories__element m-2">{e.name}</button>
            </Link>
          ))}
        </div>
      </Layout>
    </>
  );
};

export default Categories;
