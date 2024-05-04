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
    category: [],
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
            console.log(message);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

//Get all Events
export const getEvents = createAsyncThunk(
    "events/getAll",
    async (_, thunkAPI) => {
        try {
            return await eventService.getEvents();
        } catch (error) {
            const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
            console.log(message);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

//Delete a event
export const deleteEvent = createAsyncThunk(
    "events/delete",
    async (id, thunkAPI) => {
        try {
            return await eventService.deleteEvent(id);
        } catch (error) {
            const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
            console.log(message);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

//View a event
export const getEvent = createAsyncThunk(
    "events/getEvent",
    async (id, thunkAPI) => {
        try {
            return await eventService.getEvent(id);
        } catch (error) {
            const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
            console.log(message);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

const eventSlice = createSlice ({
    name: "event",
    initialState,
    reducers: {
        CALC_STORE_VALUE(state, action) {
            console.log("store value");
        },

            CALC_CATEGORY(state,action) {
                const events = action.payload;
                const array = [];
                events.map((day) => {
                    const {category} = day;

                    return array.push(category);
                });
                const uniqueCategory = [...new Set(array)]
                state.category = uniqueCategory;
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
                state.isError = false;
                console.log(action.payload);
                state.events.push(action.payload);
                toast.success("Event added successfully")
            })
            .addCase(createEvent.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                
                toast.error(action.payload);
            })

            .addCase(getEvents.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getEvents.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                console.log(action.payload);
                state.events.push(action.payload);
                state.events = action.payload;
            })
            .addCase(getEvents.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                
                toast.error(action.payload);
            })

            .addCase(deleteEvent.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteEvent.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                toast.success("Event deleted successfully")
            })
            .addCase(deleteEvent.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload);
            })

            .addCase(getEvent.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getEvent.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.event = action.payload;
            })
            .addCase(getEvent.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload);
            });
    },
});
export const {CALC_STORE_VALUE, CALC_CATEGORY} = eventSlice.actions;
export const selectEvent = (state) => state.event.event;
export const selectIsLoading = (state) => state.event.isLoading;
export const selectCategory = (state) => state.event.category;
export default eventSlice.reducer;