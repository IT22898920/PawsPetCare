import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/features/auth/authSlice';
import productReducer from '../redux/features/product/productSlice';
import filterReducer from '../redux/features/product/filterSlice';
import cartReducer from '../redux/features/cart/cartSlice'; // Import the cart reducer

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    filter: filterReducer,
    cart: cartReducer, // Add the cart reducer
  },
});
