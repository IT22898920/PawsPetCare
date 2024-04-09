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
    
            // Check if 'blog' is an array before filtering
            if (Array.isArray(blog)) {
                const tempBlog = blog.filter(
                    (blogItem) =>
                    blogItem.title.toLowerCase().includes(searchBlog.toLowerCase())
                );
    
                state.filteredblog = tempBlog;
            } else {
                // Optionally handle the case where 'blog' is not an array
                console.error('Expected an array for "blog", received:', typeof blog);
                state.filteredblog = [];
            }
        },
    },
    
});


export const { FILTER_BLOG } = filterSlice.actions;

export const selectFilteredblog = (state) => state.blogfilter.filteredblog;

export default filterSlice.reducer;
