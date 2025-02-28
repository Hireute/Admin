import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  // token: JSON.parse(localStorage.getItem('token')) || '',
  token: (() => {
    try {
      return JSON.parse(localStorage.getItem("token")) || "";
    } catch {
      return "";
    }
  })(),
  isAuthorized: false,
  userRole: JSON.parse(localStorage.getItem("userRole")) || "",
  email: "",
  passwordChangeToken: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("auth_token", state.token);
    },
    removeUser: (state) => {
      state.user = null;
    },
    setIsAuthorized: (state, action) => {
      state.isAuthorized = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPasswordChangeToken: (state, action) => {
      state.passwordChangeToken = action.payload;
    },
  },
});

export const {
  updateUser,
  setIsAuthorized,
  removeUser,
  setToken,
  setEmail,
  setPasswordChangeToken,
} = userSlice.actions;

export const userReducer = userSlice.reducer;
