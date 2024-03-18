import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"; // Assuming you use axios for API calls

const initialState = {
  items: [],
  status: null,
};

export const addToCart = createAsyncThunk("cart/addToCart", async ({ productId, quantity }, { getState, rejectWithValue }) => {
    try {
      // Here, you might call an API to add the item to a server-side cart
      // For simplicity, this example just returns the productId and quantity
      return { productId, quantity };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  });

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: {
    [addToCart.pending]: (state, action) => {
      state.status = "loading";
    },
    [addToCart.fulfilled]: (state, action) => {
      state.items.push(action.payload);
      state.status = "success";
    },
    [addToCart.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default cartSlice.reducer;
