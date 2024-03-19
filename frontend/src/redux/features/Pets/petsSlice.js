import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import petsService from './petsService';
import { toast } from 'react-toastify';

const initialState = {
   pet: null,
   pets: [],
   isError: false,
   isSuccess: false,
   isLoading: false,
   message: "",
};

// Create new Pets
const createPets = createAsyncThunk(
   "pets/create",
   async (formData, thunkAPI) => {
      try {
         const response = await petsService.createPets(formData);
         return response.data; // Assuming response.data contains the created pet object
      } catch (error) {
         const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
         console.log(message);
         return thunkAPI.rejectWithValue(message);
      }
   }
);

const petsSlice = createSlice({
   name: "Pet",
   initialState,
   reducers: {
      CALC_STORE_VALUE(state, action) {
         console.log("Store value");
      }
   },
   extraReducers: (builder) => {
      builder
         .addCase(createPets.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(createPets.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            console.log(action.payload);
            state.pets.push(action.payload);
            toast.success("Pet added successfully");
         })
         .addCase(createPets.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            toast.error("Failed to add pet: " + action.payload);
         });
   }
});

export const { CALC_STORE_VALUE } = petsSlice.actions;

export default petsSlice.reducer;
