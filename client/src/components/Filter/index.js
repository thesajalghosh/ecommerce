import React, { useState } from "react";
import "./index.css";
import { RxCross2 } from "react-icons/rx";
import useCategory from "../../hooks/useCategory";
import { Prices } from "../Prices";

const Filter = ({ setFilterPage, checked, setChecked, setRadio }) => {
  const [selectedFilter, setSelectedFilter] = useState("category");

  const categoryies = useCategory();

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
  const handlePrice = (e) => {
    const vari = e.target.value;
    const arr = vari.split(",");
    const setArr = [];
    setArr[0] = Number(arr[0]);
    setArr[1] = Number(arr[1]);
    console.log(setArr);
    setRadio(setArr);
  };

  return (
    <>
      <div className="filter__page__whole__container">
        <div className="filter__page__cross__btn">
          <div className="filter__page__title">Filter</div>
          <RxCross2 size={25} onClick={() => setFilterPage(false)} />
        </div>
        <div className="filter__page__main__content">
          <div className="main__content__left__side">
            <button
              className="left__side__button"
              onClick={() => setSelectedFilter("category")}
            >
              Category
            </button>
            <button
              className="left__side__button"
              onClick={() => setSelectedFilter("price")}
            >
              Price
            </button>
          </div>
          <div className="main__content__right__side">
            {selectedFilter === "category" && (
              <>
                <div className="filter__by__category__container">
                  <div className="heading__of__container">
                    Filter By Category
                  </div>
                  <div className="main__content__of__category">
                    {categoryies.map((ele) => (
                      <>
                        <div className="filter__every__input">
                          <input
                            type="checkbox"
                            name={ele.name}
                            onChange={(e) =>
                              handelFilter(e.target.checked, ele._id)
                            }
                          />
                          <label>{ele.name}</label>
                        </div>
                      </>
                    ))}
                  </div>
                </div>
              </>
            )}
            {selectedFilter === "price" && (
              <>
                <div className="filter__by__price__container">
                  <div className="heading__of__container">Filter By Price</div>
                  <div className="main__content__of__category">
                    {Prices.map((ele) => (
                      <>
                        <div
                          className="filter__every__input"
                          key={ele._id}
                          onChange={handlePrice}
                        >
                          <input
                            type="radio"
                            name="price__radio"
                            value={ele.array}
                          />
                          <label>{ele.name}</label>
                        </div>
                      </>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Filter;
