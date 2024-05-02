import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    filteredEvents: []

}

const eventFilterSlice = createSlice ({
    name: "eventFilter",
    initialState,
    reducers: {
        FILTER_EVENTS(state, action) {
            const {events, searchEvent} = action.payload;
            const tempEvents = events.filter((event) => event.category.toLowerCase().includes(searchEvent.toLowerCase()) || event.name.toLowerCase().includes(searchEvent.toLowerCase()) 
        );

            state.filteredEvents = tempEvents;
        },
    },
});

export const {FILTER_EVENTS} = eventFilterSlice.actions;

export const selectFilteredEvents = (state) => state.eventFilter.filteredEvents;

export default eventFilterSlice.reducer;