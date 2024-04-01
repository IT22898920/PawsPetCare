import { useEffect } from "react";
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Forgot from './pages/auth/Forgot';
import Reset from './pages/auth/Reset';
import Dashboard from "./pages/dashboard/Dashboard";
import Sidebar from "./components/sidebar/Sidebar";
import Layout from "./components/layout/Layout";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { getLoginStatus } from "./services/authService";
import { SET_LOGIN } from "./redux/features/auth/authSlice";
import AddProduct from "./pages/addProduct/AddProduct";
import ProductDetail from "./components/product/productDetail/ProductDetail";
import AllProductList from "./components/product/productDetail/AllProductList";
import EditProduct from "./pages/editProduct/EditProduct";
import Profile from "./pages/profile/Profile";
import EditProfile from "./pages/profile/EditProfile";
import Contact from "./pages/contact/Contact";
import Chart from "./pages/chart/Chart";
import OutOfStock from "./components/OutOfStock";
import ChartPage from "./components/product/totalStoreValueBarchart/ChartPage";
import UserDashboard from "./pages/userDashboard/UserDashboard";
import ViewCartItems from "./pages/cart/ViewCartItems";
import ViewOrders from "./pages/cart/ViewOrders";

axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function loginStatus() {
      const status = await getLoginStatus();
      dispatch(SET_LOGIN(status));
    }
    loginStatus();
  }, [dispatch]);

  return (
    <BrowserRouter>
    <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/resetpassword/:resetToken" element={<Reset />} />

        <Route
          path="/allusers"
          element={
            <Sidebar>
              <Layout>
                <UserDashboard />
              </Layout>
            </Sidebar>
          }
        />

        <Route
          path="/dashboard"
          element={
            <Sidebar>
              <Layout>
                <Dashboard />
              </Layout>
            </Sidebar>
          }
        />

        <Route
          path="/add-product"
          element={
            <Sidebar>
              <Layout>
                <AddProduct />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/product-detail/:id"
          element={
            <Sidebar>
              <Layout>
                <ProductDetail />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/edit-product/:id"
          element={
            <Sidebar>
              <Layout>
                <EditProduct />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/profile"
          element={
            <Sidebar>
              <Layout>
                <Profile />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/edit-profile"
          element={
            <Sidebar>
              <Layout>
                <EditProfile />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/contact-us"
          element={
            <Sidebar>
              <Layout>
                <Contact />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/chart"
          element={
            <Sidebar>
              <Layout>
                <Chart />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/AllProductList"
          element={
            <AllProductList />
          }
        />
        <Route
          path="/viewcart"
          element={
           
              <Layout>
                <ViewCartItems />
              </Layout>
            
          }
        />
        <Route
          path="/vieworders"
          element={
           
              <Layout>
                <ViewOrders />
              </Layout>
            
          }
        />
      <Route path="/out" element={<OutOfStock/>}/>
      <Route path="/total" element={<ChartPage />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

