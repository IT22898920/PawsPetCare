// src/redux/features/user/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for fetching users
export const fetchAllUsers = createAsyncThunk('users/fetchAll', async () => {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/users/all`);
    return response.data;
  });

const initialState = {
  users: [],
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
