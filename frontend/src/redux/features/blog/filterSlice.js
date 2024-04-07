import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredblog: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTER_BLOG(state, action) {
      const { blog, search } = action.payload;
      const tempblog = blog.filter(
        (blog) =>
        blog.name.toLowerCase().includes(search.toLowerCase()) //  ||
         // blog.category.toLowerCase().includes(search.toLowerCase())
      );

      state.filteredblog = tempblog;
    },
  },
});

export const { FILTER_BLOG } = filterSlice.actions;

export const selectFilteredblog = (state) => state.filter.filteredblog;

export default filterSlice.reducer;
