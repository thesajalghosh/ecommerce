import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import "./index.css";
import { Prices } from "../components/Prices";
const HomePage = () => {
  const user = useSelector((state) => state.auth.user);
  const [products, setProducts] = useState([]);
  const [categoryies, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [priceChecked, setPriceChecked] = useState([]);

  const getAllProduct = async () => {
    try {
      const product = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product`
      );

      console.log(product.data);
      if (product.data.success) {
        setProducts(product?.data?.products);
        toast.success("product get successfully");
      } else {
        toast.error("something wrong in succesfull try section");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

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

  const handelFilter = (value, id) => {
    console.log(value);
    console.log(id, "sjfksfjj");
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };
  const handelPriceFilter = () => {};

  useEffect(() => {
    getAllProduct();
    getAllCategory();
  }, []);

  return (
    <Layout title={"All Products - Best Offers"}>
      <div className="row">
        <div className="col-md-3">
          <div className="filter__category__container">
            <h5 className="text-center">Filter by category</h5>
            <div className="filter__by__category__container">
              {categoryies.map((ele) => (
                <>
                  <div className="filter__every__input">
                    <input
                      type="checkbox"
                      name={ele.name}
                      onChange={(e) => handelFilter(e.target.checked, ele._id)}
                    />
                    <label>{ele.name}</label>
                  </div>
                </>
              ))}
            </div>
          </div>
          <div className="filter__category__container">
            <h5 className="text-center">Filter by Price</h5>
            <div className="filter__by__category__container">
              {Prices.map((ele) => (
                <>
                  <div className="filter__every__input">
                    <input
                      type="radio"
                      name="price__radio"
                      onChange={(e) =>
                        handelPriceFilter(e.target.checked, ele._id)
                      }
                    />
                    <label>{ele.name}</label>
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Product</h1>
          <div className="d-flex flex-wrap"></div>
          <h1>Products</h1>

          <div className="all__products__admin__panal">
            {products?.map((e) => (
              <>
                <div
                  className="product__card"
                  // onClick={() => navigate(`/product/${e._id}`)}
                >
                  <div className="product__card__image">
                    <img
                      src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${e._id}`}
                      alt={e.slug}
                    />
                  </div>
                  <div className="lower__part__product__card">
                    <div className="lower__part__name">{e.name}</div>
                    <div className="lower__part__name">{e.description}</div>
                    <div className="lower__part__price__quantity">
                      <div className="lower__part__price">
                        Price : {e.price}
                      </div>
                      <div className="lower__part__price">
                        In stock : {e.quantity}
                      </div>
                      <div className="d-flex card__buttons">
                        <button className="btn btn-primary">
                          More Details
                        </button>
                        <button className="btn btn-primary">Add to cart</button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
