import React, { useEffect, useState } from "react";
import Layout from "../../../components/layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import "./index.css";
import { Prices } from "../../../components/Prices";
import { useNavigate } from "react-router-dom";
import { BiSort } from "react-icons/bi";
import { MdFilterAlt } from "react-icons/md";
import Filter from "../../../components/Filter";
import { setStoreCart } from "../../../redux/cartSlice";
import ProductCart from "../../../components/ProductCard";
import OfferComp from "../../../components/OfferComp";
import BestSeller from "../../../components/BestSeller";
import ShopCategory from "../../../components/ShopCategory";

const HomePage = () => {
  const user = useSelector((state) => state.auth.user);
  const [products, setProducts] = useState([]);
  const [categoryies, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [sortPage, setSortPage] = useState(false);
  const [filterPage, setFilterPage] = useState(false);
  const [cart, setCart] = useState([]);
  const [maxProductDis, setMaxProductDis] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //getTotal Count
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-count`
      );

      if (data.success) {
        setTotal(data?.total);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllProduct = async () => {
    try {
      setLoading(true);
      const product = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
      );
      setLoading(false);

      console.log(product.data);
      if (product.data.success) {
        setProducts(product?.data?.products);
        // toast.success("product get successfully");
      } else {
        // toast.error("someth?ing wrong in succesfull try section");
        console.log("something wrong in succesfull try section");
      }
    } catch (error) {
      console.log(error);
      // toast.error("something went wrong");
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

  const productFilter = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/product-filter`,
        { checked, radio }
      );
      console.log(data.products);
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePrice = (e) => {
    const vari = e.target.value;
    const arr = vari.split(",");
    const setArr = [];
    setArr[0] = Number(arr[0]);
    setArr[1] = Number(arr[1]);
    console.log(setArr);
    setRadio(setArr);
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
    if (!checked.length && !radio.length) {
      getAllProduct();
    }
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length > 0 || radio.length > 0) productFilter();
  }, [checked, radio]);

  const loadMoreHandel = (e) => {
    e.preventDefault();
    setPage(page + 1);
    loadMore(page + 1);
  };

  const loadMore = async (page) => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      console.log(data.products);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handlepriceHighLow = () => {
    setSortPage(false);
  };

  const handlePopularityHighLow = () => {
    setSortPage(false);
  };

  const AddToCartHandeler = (cartProduct) => {
    let cartVal = [...cart, cartProduct];
    setCart(cartVal);
    dispatch(setStoreCart(cartProduct));
  };

  return (
    <Layout title={"All Products - Best Offers"}>
      <div className="home__page__whole__container">
        <div className="explore__best__seller__component">
          <BestSeller categoryies={categoryies} />
        </div>
        <div className="today__offer__whole__container">
          <OfferComp />
        </div>
        <div className="shop__by__categories__whole__container">
          <ShopCategory />
        </div>
        <div className="all__product__container">
          <h1 className="text-center">All Product</h1>
          <div className="d-flex flex-wrap"></div>
          <h1>Products</h1>

          <div className="all__products__admin__panal">
            {products?.map((e) => (
              <>
                <ProductCart
                  element={e}
                  AddToCartHandeler={AddToCartHandeler}
                />
              </>
            ))}
          </div>

          <div>
            {products && products.length < total && (
              <button className="btn btn-primary" onClick={loadMoreHandel}>
                {loading ? "Loading ..." : "Loading More"}
              </button>
            )}
          </div>
        </div>
        {sortPage && (
          <>
            <div className="sort__component__whole__container">
              <button
                className="sort__element"
                value={"phl"}
                onClick={handlepriceHighLow}
              >
                Price - high to low
              </button>
              <button
                className="sort__element"
                value={"plh"}
                onClick={handlepriceHighLow}
              >
                Price - low to high
              </button>
              <button
                className="sort__element"
                value={"ph"}
                onClick={handlePopularityHighLow}
              >
                Popularity - High
              </button>
              <button
                className="sort__element"
                value={"pl"}
                onClick={handlePopularityHighLow}
              >
                Popularity - Low
              </button>
            </div>
          </>
        )}
        {filterPage && (
          <Filter
            setFilterPage={setFilterPage}
            checked={checked}
            setChecked={setChecked}
            setRadio={setRadio}
          />
        )}

        <div className="sort__filter__container">
          <button onClick={() => setSortPage(true)}>
            <BiSort size={25} /> SORT
          </button>
          <button>
            <MdFilterAlt size={25} onClick={() => setFilterPage(true)} /> FILTER
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
