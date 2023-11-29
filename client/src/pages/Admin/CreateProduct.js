import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import axios from "axios";
import { toast } from "react-toastify";

const CreateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [photo, setPhone] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quatity, setQuantity] = useState("");
  const [shiping, setShiping] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-all-category`
      );
      console.log(data);
      if (data.success) {
        setCategories(data?.category);
      }
      // console.log(data.category);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  useEffect(() => {
    getAllCategory();
  }, []);
  console.log(categories);

  return (
    <>
      <Layout title={"Dashboard - Create Product"}>
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            {" "}
            <h1>Create product</h1>
            <div className="m-1">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="" disabled>
                  Select a category
                </option>
                {categories.map((ele) => (
                  <option key={ele.name} value={ele.name}>
                    {ele.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default CreateProduct;
