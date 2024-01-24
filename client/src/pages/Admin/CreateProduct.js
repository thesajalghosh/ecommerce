import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/AdminMenu";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CreateProduct = () => {
  const [categories, setCategories] = useState([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [photo, setPhoto] = useState("");
  // const [category, setCategory] = useState("");
  const [quatity, setQuantity] = useState("");
  const [shiping, setShiping] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-all-category`
      );

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

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quatity);
      productData.append("photo", photo);
      productData.append("category", selectedCategory);

      const data = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/create-product`,
        productData,
        {
          headers: {
            authorization: token,
          },
          "Content-Type": "application/json",
        }
      );
      console.log(data);
      if (data.data.success) {
        toast.success("product create successfully");
        navigate("/dashboard/admin/product");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  return (
    <>
      <Layout title={"Dashboard - Create Product"}>
        <div className="row">
          <div className="col-md-9">
            {" "}
            <h1>Create product</h1>
            <div className="create__product__container__whole">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="" disabled>
                  Select a category
                </option>
                {categories.map((ele) => (
                  <option key={ele.name} value={ele._id}>
                    {ele.name}
                  </option>
                ))}
              </select>
              <div className="mb-3 mt-2 ">
                <lable>
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                  />
                </lable>
              </div>
              <div className="mt-2">
                {photo && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product__photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mt-3">
                <input
                  type="text"
                  value={name}
                  placeholder="write a name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mt-3">
                <textarea
                  type="text"
                  value={description}
                  placeholder="write a Description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mt-3">
                <input
                  type="text"
                  value={quatity}
                  placeholder="enter a Quantity"
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="mt-3">
                <input
                  type="text"
                  value={price}
                  placeholder="enter a Price"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mt-3">
                <select
                  placeholder="select shiping"
                  className="form-select mb-3"
                  onChange={(value) => setShiping(value)}
                >
                  <option value="" disabled>
                    Select shiping
                  </option>
                  <option value="0">NO</option>
                  <option value="1">YES</option>
                </select>
              </div>

              <div className="mt-3">
                <button
                  className="btn btn-primary"
                  onClick={handleCreateProduct}
                >
                  Create Product
                </button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default CreateProduct;
