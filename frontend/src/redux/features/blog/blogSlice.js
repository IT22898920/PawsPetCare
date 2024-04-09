import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import blogService from "./blogService"; // Ensure this is the only import statement for blogService
import { toast } from 'react-toastify';

const initialState = {
    blog: null,
    blogs: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

//crate new blog

export const createBlog = createAsyncThunk(
    "blogs/create",
    async (formData, thunkAPI) => {
        try {
            const response = await blogService.createBlog(formData);
            return response.data; // Assuming response.data contains the created blog object
         } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            console.log(message);
            return thunkAPI.rejectWithValue(message);
         }
    }
 );

 // Get all blogs
export const getBlogs = createAsyncThunk(
    "blog/getAll",
    async (_, thunkAPI) => {
      try {
        return await blogService.getBlogs();
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        console.log(message);
        return thunkAPI.rejectWithValue(message);
      }
    }
  );

// Delete a Product
export const deleteBlog = createAsyncThunk(
  "blog/delete",
  async (id, thunkAPI) => {
    try {
      return await blogService.deleteBlog(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);
 
 // Get a blog
 export const getBlog = createAsyncThunk(
   "blog/getBlog",
   async (id, thunkAPI) => {
     try {
       return await blogService.getBlog(id);
     } catch (error) {
       const message =
         (error.response &&
           error.response.data &&
           error.response.data.message) ||
         error.message ||
         error.toString();
       console.log(message);
       return thunkAPI.rejectWithValue(message);
     }
   }
 );


//  // Update blog
//  export const updateblog = createAsyncThunk(
//    "blog/updateblog",
//    async ({ id, formData }, thunkAPI) => {
//      try {
//        return await blogService.updateblog(id, formData);
//      } catch (error) {
//        const message =
//          (error.response &&
//            error.response.data &&
//            error.response.data.message) ||
//          error.message ||
//          error.toString();
//        console.log(message);
//        return thunkAPI.rejectWithValue(message);
//      }
//    }
//  );


  const blogSlice = createSlice({
   name: "blog",
   initialState,
   reducers: {

   },


   extraReducers: (builder) => {
     builder
      //Create new blogs
       .addCase(createBlog.pending, (state) => {
         state.isLoading = true;
       })
       .addCase(createBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        // Assuming action.payload contains the newly created blog
        state.blogs.push(action.payload);
        toast.success("Blog added successfully");
      })
      
       .addCase(createBlog.rejected, (state, action) => {
         state.isLoading = false;
         state.isError = true;
         state.message = action.payload;
         toast.error(action.payload);
       })
        // Get all blogs
       .addCase(getBlogs.pending, (state) => {
         state.isLoading = true;
       })
       .addCase(getBlogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload); // Check what you get here
        state.blog = action.payload; // Make sure action.payload is an array
      })
   
       .addCase(getBlogs.rejected, (state, action) => {
         state.isLoading = false;
         state.isError = true;
         state.message = action.payload;
         toast.error(action.payload);
       })

       //delete
       .addCase(deleteBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("Blog deleted successfully");
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
    
        // Get a blog
       .addCase(getBlog.pending, (state) => {
         state.isLoading = true;
       })
       .addCase(getBlog.fulfilled, (state, action) => {
         state.isLoading = false;
         state.isSuccess = true;
         state.isError = false;
         state.blog = action.payload;
       })
       .addCase(getBlog.rejected, (state, action) => {
         state.isLoading = false;
         state.isError = true;
         state.message = action.payload;
         toast.error(action.payload);
       })
    //    // Update blog
    //    .addCase(updateblog.pending, (state) => {
    //      state.isLoading = true;
    //    })
    //    .addCase(updateblog.fulfilled, (state, action) => {
    //      state.isLoading = false;
    //      state.isSuccess = true;
    //      state.isError = false;
    //      toast.success("blog updated successfully");
    //    })
    //    .addCase(updateblog.rejected, (state, action) => {
    //      state.isLoading = false;
    //      state.isError = true;
    //      state.message = action.payload;
    //      toast.error(action.payload);
    //    });
   },
 });
 
//  export const { CALC_STORE_VALUE, CALC_OUTOFSTOCK, CALC_CATEGORY } =
//  blogSlice.actions;
 
  export const selectIsLoading = (state) => state.blog.isLoading;
//  export const selectblog = (state) => state.blog.blog;
//  export const selectTotalStoreValue = (state) => state.blog.totalStoreValue;
//  export const selectOutOfStock = (state) => state.blog.outOfStock;
//  export const selectCategory = (state) => state.blog.category;
 
 export default blogSlice.reducer;