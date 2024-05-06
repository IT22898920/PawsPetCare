import { createSlice } from "@reduxjs/toolkit";


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
  email: "", // New field for storing email directly in the auth state
  user: {
    name: "",
    email: "",
    // phone: "",
    bio: "",
    photo: "",
    isDoctor: ""
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
      // state.user.phone = profile.phone;
      state.user.bio = profile.bio;
      state.user.photo = profile.photo;
      state.user.isDoctor = profile.isDoctor;
    },
    SET_ROLE(state, action) {
      state.role = action.payload;
    },
    SET_PHONE(state, action) {
      state.phone = action.payload;
    },
  },
});

export const { SET_LOGIN, SET_NAME, SET_USER, SET_ROLE,SET_PHONE } = authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectName = (state) => state.auth.name;
export const selectEmail = (state) => state.auth.email; // Selector for directly accessing email from auth state
export const selectUser = (state) => state.auth.user;
export const selectRole = (state) => state.auth.role; // Export a selector for the role
export const selectPhone = (state) => state.auth.phone;

export default authSlice.reducer;
