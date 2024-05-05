import { createSlice , createAsyncThunk } from '@reduxjs/toolkit'
import userAdoptionService from './userAdoptionService';
import { toast } from "react-toastify";

const initialState = {
    userAdoption: null,
    userAdoptions:[],
    isError: false,
    isSuccess: false,
    isLoading: false,
    isLoading: false,
    message:"",
}

// Create  userAdoption
export const createUserAdoption = createAsyncThunk(
    "userAdoption/create",
    async (formData, thunkAPI) => {
      try {
        return await userAdoptionService.createUserAdoption(formData);
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

const userAdoptionSlice = createSlice({
    name: 'userAdoption', 
    initialState,
  reducers: {
    CAL_STORE_VALUE(state, action){
        console.log("store value")
    }
  },
  extraReducers: (builder) => {
    builder
        .addCase(createUserAdoption.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(createUserAdoption.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            console.log(action.payload);
            state.userAdoptions.push(action.payload);
            toast.success("userAdoption added successfully");
        })
        .addCase(createUserAdoption.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            toast.error(action.payload);
        });
  }
});

export const selectIsLoading = (state) => state.userAdoption.isLoading;
export const {CAL_STORE_VALUE} = userAdoptionSlice.actions
//export const selectUserAdoption = (state) => state.userAdoption.userAdoption;

export default userAdoptionSlice.reducer