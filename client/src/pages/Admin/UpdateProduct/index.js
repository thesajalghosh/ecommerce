import React, { useEffect, useState } from "react";
import Layout from "../../../components/layout/Layout";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import AdminMenu from "../../../components/layout/AdminMenu";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const UpdateProduct = () => {
  const [product, setProduct] = useState({});
  let { pid } = useParams();
  const [categories, setCategories] = useState(null);
  const [photo, setPhoto] = useState(null);
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  console.log(pid);

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
  console.log(categories);

  const productApi = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/product/get-product/${pid}`
    );
    if (data.success) {
      setProduct(data.product[0]);
    }
  };

  const getProductPhoto = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/product/product-photo/${pid}`
    );
    console.log(data);
    setPhoto(data);
  };

  console.log(product);

  const handleSelect = (e) => {
    const selectedCategory = categories.filter(
      (ele) => ele._id === e.target.value
    );
    console.log(selectedCategory[0]);
    setProduct((prev) => ({ ...prev, category: selectedCategory[0]._id }));
  };
  const handlePhoto = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleName = (e) => {
    setProduct((prev) => ({ ...prev, name: e.target.value }));
  };

  const handleDescription = (e) => {
    setProduct((prev) => ({ ...prev, description: e.target.value }));
  };
  const handlePrice = (e) => {
    setProduct((prev) => ({ ...prev, price: e.target.value }));
  };
  const handleQuantity = (e) => {
    setProduct((prev) => ({ ...prev, quantity: e.target.value }));
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();

      productData.append("name", product.name);
      productData.append("description", product.description);
      productData.append("price", product.price);
      productData.append("quantity", product.quantity);
      productData.append("category", product.category);
      photo && productData.append("photo", photo);

      console.log(productData);

      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/product/update-product/${pid}`,
        productData,
        {
          headers: {
            authorization: token,
          },
          "Content-Type": "application/json",
        }
      );

      if (data?.success) {
        toast.success("product Updated successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  useEffect(() => {
    getAllCategory();
    productApi();
    getProductPhoto();
  }, []);

  console.log(product);
  const handleDeleteProduct = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/product/delete-product/${pid}`
      );
      if (data.success) {
        toast.success("Product deleted successfull");
        navigate(-1);
      }
    } catch (error) {
      console.log(error);
      toast.error("some thing went wrong in delete");
    }
  };

  return (
    <>
      <Layout title={"DashBoard -  Update Product"}>
        <div className="container-fluid m-3 p-3">
          <div className="row">
            <div className="col-md-3">
              <AdminMenu />
            </div>
            <div className="col-md-9">
              <h1>Update Product</h1>
            </div>
            <div className="m-1 w-75">
              <select
                bordered={false}
                placeholder="Select a category"
                className="form-select mb-3"
                Value={product.category}
                onChange={handleSelect}
              >
                {" "}
                {categories?.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
              <div className="mb-3">
                <lebel className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={handlePhoto}
                  />
                </lebel>
              </div>
              <div className="mb-3">
                {photo ? (
                  <div className="text-center">
                    <img
                      src={photo}
                      alt="product photo"
                      className="img img-responsive"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <img
                      src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
                      alt="product photo"
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <label>Name</label>
                <input
                  type="text"
                  value={product.name}
                  placeholder="write product name"
                  className="form-control"
                  onChange={handleName}
                />
              </div>
              <div className="mb-3">
                <label>Description</label>
                <input
                  type="text"
                  value={product.description}
                  placeholder="write Description"
                  className="form-control"
                  onChange={handleDescription}
                />
              </div>
              <div className="mb-3">
                <label>Price</label>
                <input
                  type="text"
                  value={product.price}
                  placeholder="Enter the Price"
                  className="form-control"
                  onChange={handlePrice}
                />
              </div>
              <div className="mb-3">
                <label>Quantity</label>
                <input
                  type="text"
                  value={product.quantity}
                  placeholder="Enter the Price"
                  className="form-control"
                  onChange={handleQuantity}
                />
              </div>

              <div className="mt-3">
                <button
                  className="btn btn-primary"
                  onClick={handleUpdateProduct}
                >
                  Update Product
                </button>
                <button
                  className="btn btn-primary"
                  onClick={handleDeleteProduct}
                >
                  Delete Product
                </button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default UpdateProduct;
