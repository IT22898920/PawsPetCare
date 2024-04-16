import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import eventService from "./eventService";
import { toast } from "react-toastify";

const initialState = {
    event: null,
    events: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",

};

//Create New Event
export const createEvent = createAsyncThunk(
    "events/create",
    async (formData, thunkAPI) => {
        try {
            return await eventService.createEvent(formData);
        } catch (error) {
            const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
            console.log(message)
            return thunkAPI.rejectWithValue(message)
        }
    }
)

const eventSlice = createSlice ({
    name: "event",
    initialState,
    reducers: {
        CALC_STORE_VALUE(state, action) {
            console.log("store value");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createEvent.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createEvent.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                console.log(action.payload)
                state.events.push(action.payload);
                toast.success("Event added successfully")
            })
            .addCase(createEvent.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                
                toast.error(action.payload)
            })
    },
});
export const {CALC_STORE_VALUE} = eventSlice.actions

export const selectIsLoading = (state) => state.event.isLoading;

export default eventSlice.reducer;