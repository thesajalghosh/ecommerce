import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";

import HomePage from "./pages/user/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import PageNotFount from "./pages/PageNotFount";
import Register from "./pages/Auth/Register";
import { useSelector } from "react-redux";

import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/user/Dashboard";
import Private from "./components/Routes/Private";

import ForgotPassword from "./pages/Auth/ForgetPassword";
import AdminRoute from "./components/Routes/AdminRoutes";
import CreateCategory from "./pages/Admin/CreateCategory";
import CreateProduct from "./pages/Admin/CreateProduct";
import Users from "./pages/Admin/Users";
import Order from "./pages/user/Order";
import Profile from "./pages/user/Profile";
import Products from "./pages/Admin/Product";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import SearchPage from "./pages/SearchPage";
import ProductDetails from "./pages/ProductDetails";
import Categories from "./pages/Categories";
import CategoryProduct from "./pages/CategoryProduct";
import Authenticate from "./pages/Authenticate";
import ProfilePage from "./pages/user/ProfilePage";
import Cart from "./pages/user/Cart";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import OfferProductCreate from "./pages/Admin/OfferProductCreate";
import OfferedProduct from "./pages/Admin/OfferedProduct";
import OfferPage from "./pages/user/OfferPage";
import CreateOffer from "./pages/Admin/CreateOffer";
import CategoryProductPage from "./pages/CategoryProductPage";

function App() {
  // const user = useSelector((state) => state.auth.token);
  // console.log(user);
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/all-categories" element={<Categories />} />
        <Route path="/category/:id" element={<CategoryProduct />} />
        <Route path="/category-prodct/:cid" element={<CategoryProductPage />} />
        //This Route is only available in when anyone is login as a user
        <Route path="/dashboard" element={<Private />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/orders" element={<Order />} />
          {/* <Route path="user/profile" element={<Profile />} /> */}
          <Route path="user/profile" element={<ProfilePage />} />
        </Route>
        // This route is only available in Admin Route anyone is login as a
        admin
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/product/:pid" element={<UpdateProduct />} />
          <Route path="admin/product" element={<Products />} />
          <Route path="admin/users" element={<Users />} />
          <Route path="admin/offer-create" element={<OfferProductCreate />} />
          <Route path="admin/create-offer/:id" element={<CreateOffer />} />
          <Route path="admin/offered-product" element={<OfferedProduct />} />
        </Route>
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/auth-page" element={<Authenticate />} />
        <Route path="cart" element={<Cart />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/offer-page" element={<OfferPage />} />
        <Route path="*" element={<PageNotFount />} />
      </Routes>
    </>
  );
}

export default App;
