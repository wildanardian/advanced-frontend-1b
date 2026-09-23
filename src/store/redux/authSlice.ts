import { createSlice } from "@reduxjs/toolkit";

const AUTH_STORAGE_KEY = "chill_auth";

function loadAuthFromStorage() {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  }catch {
    return null;
  }
}

const initialState = {
  user: loadAuthFromStorage(),
  isAuthenticated: !!loadAuthFromStorage(),
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login : (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem(AUTH_STORAGE_KEY);
    },
  },
});

export const {login, logout} = authSlice.actions;
export default authSlice.reducer;