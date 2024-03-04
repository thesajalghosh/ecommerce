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

import ForgotPassword from "./pages/Auth/ForgetPassword";
import AdminRoute from "./components/Routes/AdminRoutes";

import CreateCategory from "./pages/Admin/CreateCategory";
import CreateProduct from "./pages/Admin/CreateProduct";
import Users from "./pages/Admin/Users";
import Products from "./pages/Admin/Product";
import UpdateProduct from "./pages/Admin/UpdateProduct";

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
import ProductDetails from "./pages/ProductDetails";
import OrderPage from "./pages/Order";
import SearchPage from "./pages/SearchPage";
import UserRoutes from "./components/Routes/UserRoutes";
import AdminProfile from "./pages/Admin/AdminProfile";
import AdminOrders from "./pages/Admin/AdminOrders";
import { useSocket } from "./socket";
import { Socket } from "socket.io-client";

function App() {
  const user = useSelector((state) => state.auth.user);
  console.log(user);
  useSocket(user.cid);

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth-page" element={<Authenticate />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/offer-page" element={<OfferPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/category-prodct/:cid" element={<CategoryProductPage />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/all-categories" element={<Categories />} />
        <Route path="/category/:id" element={<CategoryProduct />} />
        <Route path="*" element={<PageNotFount />} />
        //this Route only access by user
        <Route path="user-dashboard" element={<UserRoutes />}>
          <Route path="user-profile" element={<ProfilePage />} />
          <Route path="user-order" element={<OrderPage />} />
        </Route>
        //this Route only access by Admin
        <Route path="/admin-dashboard" element={<AdminRoute />}>
          <Route path="admin-profile" element={<AdminProfile />} />
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="create-category" element={<CreateCategory />} />
          <Route path="create-product" element={<CreateProduct />} />
          <Route path="product/:pid" element={<UpdateProduct />} />
          <Route path="product" element={<Products />} />
          <Route path="users" element={<Users />} />
          <Route path="offer-create" element={<OfferProductCreate />} />
          <Route path="create-offer/:id" element={<CreateOffer />} />
          <Route path="offered-product" element={<OfferedProduct />} />
          <Route path="orders-by-users" element={<AdminOrders />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
