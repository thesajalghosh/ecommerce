import React, { useEffect, useState } from "react";
import "./index.css";
import Layout from "../../components/layout/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductCart from "../../components/ProductCard";
import { setStoreCart } from "../../redux/cartSlice";
import { useDispatch } from "react-redux";

const CategoryProductPage = () => {
  const [catProduct, setCatProduct] = useState([]);
  const [cart, setCart] = useState([]);
  const { cid } = useParams();
  const dispatch = useDispatch();

  const getCategoryProduct = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/product/category-product/${cid}`
    );

    console.log(data.products);
    setCatProduct(data?.products);
  };
  useEffect(() => {
    getCategoryProduct();
  }, []);
  const AddToCartHandeler = (cartProduct) => {
    let cartVal = [...cart, cartProduct];
    setCart(cartVal);
    dispatch(setStoreCart(cartProduct));
  };
  return (
    <>
      <Layout>
        <div className="category__product__page__whole__container">
          <div className="category__product__page__header">
            {catProduct[0]?.name} Category All Product
          </div>
          <div className="category__product__page__elements">
            {catProduct.map((ele) => (
              <div>
                <ProductCart
                  element={ele}
                  AddToCartHandeler={AddToCartHandeler}
                />
              </div>
            ))}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default CategoryProductPage;
