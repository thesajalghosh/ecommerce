import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import "./index.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SearchPage = () => {
  const token = useSelector((state) => state.auth.token);
  const [search, setSearch] = useState("");
  const [result, setReasult] = useState([]);
  const navigate = useNavigate();

  const searchHandeler = async (e) => {
    setSearch(e.target.value);
    if (e.target.value.length !== 0) {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/search/${e.target.value}`
      );

      if (data.length !== 0) setReasult(data);
    }
  };

  console.log(result);

  return (
    <>
      <Layout>
        <div className="search__container__whole">
          <div className="search__bar">
            <input
              placeholder="write any product name"
              onChange={searchHandeler}
              value={search}
            />
          </div>

          <div className="Seaech__container__search__result">
            {result?.map((e) => (
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
                        Price : $ {e.price}
                      </div>
                      <div className="lower__part__price">
                        In stock : {e.quantity}
                      </div>
                      <div className="d-flex card__buttons">
                        <button
                          className="btn btn-primary"
                          onClick={() => navigate(`/product/${e._id}`)}
                        >
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
      </Layout>
    </>
  );
};

export default SearchPage;
