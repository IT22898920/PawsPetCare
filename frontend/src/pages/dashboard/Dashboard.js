import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProductList from "../../components/product/productList/ProductList";
import ProductSummary from "../../components/product/productSummary/ProductSummary";
import { selectIsLoggedIn, selectRole } from "../../redux/features/auth/authSlice"; // Corrected import
import { getProducts } from "../../redux/features/product/productSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userRole = useSelector(selectRole); 

  useEffect(() => {
    if (!isLoggedIn || userRole !== 'admin') {
      navigate("/login");
      return;
    }

    dispatch(getProducts());
  }, [dispatch, isLoggedIn, navigate, userRole]);

  const { products, isLoading, isError, message } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
  }, [isError, message]);

  return (
    <div>
      <ProductSummary products={products} />
      <ProductList products={products} isLoading={isLoading} />
    </div>
  );
};

export default Dashboard;
