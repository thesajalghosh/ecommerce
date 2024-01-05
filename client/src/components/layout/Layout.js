import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import "./Layout.css";
import { Helmet } from "react-helmet";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { RxCross2 } from "react-icons/rx";
import { setSideBar } from "../../redux/authSlice";
import { FaPlus } from "react-icons/fa6";
import { TiMinus } from "react-icons/ti";
import { MdKeyboardArrowRight } from "react-icons/md";
import useCategory from "../../hooks/useCategory";
import { useNavigate } from "react-router-dom";

const Layout = ({ children, title, description, keywords, author }) => {
  const sideBar = useSelector((state) => state.auth.sideBar);
  const dispatch = useDispatch();
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const categories = useCategory();
  const navigate = useNavigate();

  const closeButtonHandeler = () => {
    dispatch(setSideBar(false));
  };
  const categoriesHandeler = () => {
    setCategoriesOpen(!categoriesOpen);
  };
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
      </Helmet>
      <Header />
      <main className="main__layout__inner__content">
        <ToastContainer />
        {children}
      </main>

      <Footer />
      {sideBar && (
        <>
          <div className="sidebar__whole__container">
            <div className="sidebar__main__content">
              <div className="main__content__close__button">
                <RxCross2 onClick={closeButtonHandeler} size={27} />
              </div>
              <div className="main__element__container">
                <div className="category__container__specific">
                  <div className="main__element__name">Categories</div>
                  <div
                    className="main__element__icon"
                    onClick={categoriesHandeler}
                  >
                    {!categoriesOpen ? <FaPlus /> : <TiMinus />}
                  </div>
                </div>
                {categoriesOpen && (
                  <>
                    {categories.map((e) => (
                      <div className="">
                        <>{e.name}</>
                      </div>
                    ))}
                  </>
                )}
              </div>
              <div className="main__element__container">
                <div className="main__element__name">Manage Orders</div>
                <div className="main__element__icon">
                  <MdKeyboardArrowRight size={25} />
                </div>
              </div>
              <div className="main__element__container">
                <div className="main__element__name">Goto Cart</div>
                <div className="main__element__icon">
                  <MdKeyboardArrowRight size={25} />
                </div>
              </div>
              <div className="main__element__container">
                <div className="main__element__name">Logout</div>
                <div className="main__element__icon">
                  <MdKeyboardArrowRight size={25} />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Layout;

Layout.defaultProps = {
  title: "Ecommerce app",
  description: "mern stack project",
  keywords: "mern, react, node, mongodb",
  author: "Sajal Ghosh",
};
