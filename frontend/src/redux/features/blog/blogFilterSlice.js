import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredblog: [],
};

const filterSlice = createSlice({
    name: "blogfilter", 
    initialState,
    reducers: {
        FILTER_BLOG(state, action) {
            const { blog, searchBlog } = action.payload;
            const tempBlog = blog.filter(
                (blogItem) =>
                blogItem.title.toLowerCase().includes(searchBlog.toLowerCase())
            );

            state.filteredblog = tempBlog;
        },
    },
});


export const { FILTER_BLOG } = filterSlice.actions;

export const selectFilteredblog = (state) => state.blogfilter.filteredblog;

export default filterSlice.reducer;
