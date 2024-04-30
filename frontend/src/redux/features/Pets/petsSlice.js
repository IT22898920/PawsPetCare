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
 export const createPets = createAsyncThunk(
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

// get all Pets
export const getPets = createAsyncThunk("pets/getAll", async (_, thunkAPI) => {
   try {
     const response = await petsService.getPets();
     console.log("API Response:", response.data);  // Ensure data is as expected
     return response.data;  // Confirm this matches your expected format
   } catch (error) {
     const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
     console.error("API Error:", message);
     return thunkAPI.rejectWithValue(message);
   }
 });
 






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
            state.isError = false;
            console.log(action.payload);
            state.pets.push(action.payload);
            toast.success("Pet added successfully");
         })
         .addCase(createPets.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            toast.error("Failed to add pet: " + action.payload);
         })

         //get all pets
         .addCase(getPets.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(getPets.fulfilled, (state, action) => {
            console.log('Payload received:', action.payload); // Check received payload
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.pets = action.payload;  // Ensure this assignment is correct
          })
         .addCase(getPets.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            toast.error(action.payload);
         });
   }
});

export const { CALC_STORE_VALUE } = petsSlice.actions;
export const selectPets = (state) => state.pet.pets; // Adjust according to your state structure

export const selectIsLoading = (state) => state.pet.isLoading;
export default petsSlice.reducer;
