import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/features/auth/authSlice";
import productReducer from "../redux/features/product/productSlice";
import petReducer from "../redux/features/Pets/petsSlice";
import filterReducer from "../redux/features/product/filterSlice";
 
export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    pet :petReducer,
    filter: filterReducer,

  },
});
