import { createSlice } from "@reduxjs/toolkit";

// Use the safeParseJSON function to safely parse the "name" from localStorage
const safeParseJSON = (key) => {
  const item = localStorage.getItem(key);
  try {
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error(`Error parsing ${key} from localStorage:`, error);
    return null;  // Fallback value if parsing fails
  }
};

const name = safeParseJSON("name");

const initialState = {
  isLoggedIn: false,
  name: name || "", // Fallback to an empty string if name is null
  user: {
    name: "",
    email: "",
    phone: "",
    bio: "",
    photo: "",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SET_LOGIN(state, action) {
      state.isLoggedIn = action.payload;
    },
    SET_NAME(state, action) {
      localStorage.setItem("name", JSON.stringify(action.payload));
      state.name = action.payload;
    },
    SET_USER(state, action) {
      const profile = action.payload;
      state.user.name = profile.name;
      state.user.email = profile.email;
      state.user.phone = profile.phone;
      state.user.bio = profile.bio;
      state.user.photo = profile.photo;
    },
    SET_ROLE(state, action) {
      state.role = action.payload;
    },
  },
});

export const { SET_LOGIN, SET_NAME, SET_USER, SET_ROLE } = authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectName = (state) => state.auth.name;
export const selectUser = (state) => state.auth.user;
export const selectRole = (state) => state.auth.role; // Export a selector for the role

export default authSlice.reducer;
