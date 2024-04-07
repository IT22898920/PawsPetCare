import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import blogService from './blogService';
import { toast } from 'react-toastify';

const initialState = {
    blog: null,
    blogs: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
    totalStoreValue: 0,
    outOfStock: 0,
    category: [],

};

//crate new blog

const createblog = createAsyncThunk(
    "blogs/create",
    async (formData, thunkAPI) => {
        try {
            const response = await blogService.createblog(formData);
            return response.data; // Assuming response.data contains the created blog object
         } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            console.log(message);
            return thunkAPI.rejectWithValue(message);
         }
    }
 );

 // Get all blogs
export const getblogs = createAsyncThunk(
    "blog/getAll",
    async (_, thunkAPI) => {
      try {
        return await blogService.getblogs();
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

  // Delete a blog
export const deleteblog = createAsyncThunk(
   "blog/delete",
   async (id, thunkAPI) => {
     try {
       return await blogService.deleteblog(id);
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
 export const getblog = createAsyncThunk(
   "blog/getblog",
   async (id, thunkAPI) => {
     try {
       return await blogService.getblog(id);
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
 // Update blog
 export const updateblog = createAsyncThunk(
   "blog/updateblog",
   async ({ id, formData }, thunkAPI) => {
     try {
       return await blogService.updateblog(id, formData);
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


  const blogSlice = createSlice({
   name: "blog",
   initialState,
   reducers: {

     CALC_STORE_VALUE(state, action) {
       const blog = action.payload;
       const array = [];
       blog.map((item) => {
         const { price, quantity } = item;
         const productValue = price * quantity;
         return array.push(productValue);
       });
       const totalValue = array.reduce((a, b) => {
         return a + b;
       }, 0);
       state.totalStoreValue = totalValue;
     },


     CALC_OUTOFSTOCK(state, action) {
       const blog = action.payload;
       const array = [];
       blog.map((item) => {
         const { quantity } = item;
 
         return array.push(quantity);
       });
       let count = 0;
       array.forEach((number) => {
         if (number === 0 || number === "0") {
           count += 1;
         }
       });
       state.outOfStock = count;
     },


     CALC_CATEGORY(state, action) {
       const blog = action.payload;
       const array = [];
       blog.map((item) => {
         const { category } = item;
 
         return array.push(category);
       });
       const uniqueCategory = [...new Set(array)];
       state.category = uniqueCategory;
     },
   },


   extraReducers: (builder) => {
     builder
      //Create new blogs
       .addCase(createblog.pending, (state) => {
         state.isLoading = true;
       })
       .addCase(createblog.fulfilled, (state, action) => {
         state.isLoading = false;
         state.isSuccess = true;
         state.isError = false;
         console.log(action.payload);
         state.blog.push(action.payload);
         toast.success("blog added successfully");
       })
       .addCase(createblog.rejected, (state, action) => {
         state.isLoading = false;
         state.isError = true;
         state.message = action.payload;
         toast.error(action.payload);
       })
        // Get all blogs
       .addCase(getblogs.pending, (state) => {
         state.isLoading = true;
       })
       .addCase(getblogs.fulfilled, (state, action) => {
         state.isLoading = false;
         state.isSuccess = true;
         state.isError = false;
         console.log(action.payload);
         state.blog = action.payload;
       })
       .addCase(getblogs.rejected, (state, action) => {
         state.isLoading = false;
         state.isError = true;
         state.message = action.payload;
         toast.error(action.payload);
       })
       // Delete a blog
       .addCase(deleteblog.pending, (state) => {
         state.isLoading = true;
       })
       .addCase(deleteblog.fulfilled, (state, action) => {
         state.isLoading = false;
         state.isSuccess = true;
         state.isError = false;
         toast.success("blog deleted successfully");
       })
       .addCase(deleteblog.rejected, (state, action) => {
         state.isLoading = false;
         state.isError = true;
         state.message = action.payload;
         toast.error(action.payload);
       })
        // Get a blog
       .addCase(getblog.pending, (state) => {
         state.isLoading = true;
       })
       .addCase(getblog.fulfilled, (state, action) => {
         state.isLoading = false;
         state.isSuccess = true;
         state.isError = false;
         state.blog = action.payload;
       })
       .addCase(getblog.rejected, (state, action) => {
         state.isLoading = false;
         state.isError = true;
         state.message = action.payload;
         toast.error(action.payload);
       })
       // Update blog
       .addCase(updateblog.pending, (state) => {
         state.isLoading = true;
       })
       .addCase(updateblog.fulfilled, (state, action) => {
         state.isLoading = false;
         state.isSuccess = true;
         state.isError = false;
         toast.success("blog updated successfully");
       })
       .addCase(updateblog.rejected, (state, action) => {
         state.isLoading = false;
         state.isError = true;
         state.message = action.payload;
         toast.error(action.payload);
       });
   },
 });
 
 export const { CALC_STORE_VALUE, CALC_OUTOFSTOCK, CALC_CATEGORY } =
 blogSlice.actions;
 
 export const selectIsLoading = (state) => state.blog.isLoading;
 export const selectblog = (state) => state.blog.blog;
 export const selectTotalStoreValue = (state) => state.blog.totalStoreValue;
 export const selectOutOfStock = (state) => state.blog.outOfStock;
 export const selectCategory = (state) => state.blog.category;
 
 export default blogSlice.reducer;
 