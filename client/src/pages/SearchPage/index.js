import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import { IoSearchSharp } from "react-icons/io5";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./index.css";
import { FaTrashAlt } from "react-icons/fa";
import Loader from "../../components/Loader";
import { BiSort } from "react-icons/bi";
import { MdFilterAlt } from "react-icons/md";
import Filter from "../../components/Filter";
import { FaRupeeSign } from "react-icons/fa";
import { SiExpressvpn } from "react-icons/si";
import { TbMinusVertical } from "react-icons/tb";
import { IoIosHeartEmpty } from "react-icons/io";
const SearchPage = () => {
  const token = useSelector((state) => state.auth.token);
  const [search, setSearch] = useState("");
  const [result, setReasult] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [sortPage, setSortPage] = useState(false);
  const [filterPage, setFilterPage] = useState(false);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);

  const searchHandeler = async (e) => {
    setLoading(true);
    setSearch(e.target.value);
    if (e.target.value.length > 2) {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/search/${e.target.value}`
      );

      if (data.length !== 0) setReasult(data);
    }
    setLoading(false);
  };

  console.log(result);
  const traceButtonHandeler = () => {
    setReasult([]);
  };
  const handlepriceHighLow = () => {
    setSortPage(false);
  };

  const handlePopularityHighLow = () => {
    setSortPage(false);
  };
  const textTranked = (text) => {
    console.log(text);
    return text.subString(0, 30);
  };

  const likeProductHandeler = async (e) => {
    console.log(e);
    const res = await axios.put(
      `${process.env.REACT_APP_API}/api/v1/auth/add-like-product`,
      { lp: e._id },
      {
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(res);
  };

  return (
    <>
      <Layout>
        <div className="search__container__whole">
          <div className="search__bar">
            <IoSearchSharp size={25} />
            <input
              placeholder="write any product name"
              onChange={searchHandeler}
              value={search}
            />
          </div>
          {result.length !== 0 && (
            <div className="search__result__sub__heanding">
              <span>Search result</span>
              <button onClick={traceButtonHandeler}>
                <FaTrashAlt />
              </button>
            </div>
          )}
          {loading === true ? (
            <Loader />
          ) : (
            <div className="Seaech__container__search__result">
              {result.length === 0 ? (
                <div className="no__product__found">
                  <span>NO Product is found</span>
                </div>
              ) : (
                <div className="all__result__whole__contianer">
                  {result?.map((e) => (
                    <>
                      <div
                        className="search__product__card"
                        onClick={() => navigate(`/product/${e._id}`)}
                        key={e._id}
                      >
                        <div className="search__product__card__image">
                          <img src={e.url} alt={e.slug} />
                        </div>
                        <div className="search__lower__part__product__card">
                          <div className="search__lower__part__name">
                            {e.name.slice(0, 15)}{" "}
                            <IoIosHeartEmpty
                              size={20}
                              onClick={() => likeProductHandeler(e)}
                            />
                          </div>
                          <div className="search__lower__part__des">
                            {/* {textTranked(e.description)} */}
                            {e.description.slice(0, 20)}...
                          </div>
                          <div className="lower__part__price__quantity">
                            <div className="search__lower__part__price">
                              <FaRupeeSign />
                              {e.price}
                            </div>
                          </div>
                          <div className="express__delivery__section">
                            <div className="delivery__left">
                              <SiExpressvpn /> EXPRESS
                            </div>
                            <TbMinusVertical />
                            <div className="delivery__right">
                              5 Day Delivery
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        {result.length !== 0 && (
          <div className="sort__filter__container">
            <button onClick={() => setSortPage(true)}>
              <BiSort size={25} /> SORT
            </button>
            <button>
              <MdFilterAlt size={25} onClick={() => setFilterPage(true)} />{" "}
              FILTER
            </button>
          </div>
        )}
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
      </Layout>
    </>
  );
};

export default SearchPage;
