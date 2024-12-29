import { createSlice } from "@reduxjs/toolkit";

//Defining slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false, // Track if the user is authenticated (i.e., logged in)
    isGuest: false, // Initially isGuest is set to false to automatically navigate Login page
    userId: null,
    error: null,
  },
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.isGuest = false; // Mark as not guest when loggedIn
      state.userId = action.payload;
      state.error = null; // clear error on successful login
    },
    logout(state) {
      state.isAuthenticated = false;
      state.isGuest = true;
      state.userId = null;
      state.error = null;
    },
    setAsGuest(state) {
      state.isAuthenticated = false;
      state.isGuest = true; // Mark as guest
      state.userId = null;
      state.error = null;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { login, logout, setError, setAsGuest } = authSlice.actions;

export default authSlice.reducer;
