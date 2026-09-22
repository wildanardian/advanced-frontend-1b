import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "user";
  password: string;
  isSubscriptionActive: boolean;
  subscriptionPlan: string;
  subscriptionExpiryDate: Date;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

const AUTH_STORAGE_KEY = "chill_auth";

function loadAuthFromStorage(): User | null {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  }catch {
    return null;
  }
}

const initialState: AuthState = {
  user: loadAuthFromStorage(),
  isAuthenticated: !!loadAuthFromStorage(),
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login : (state, action: PayloadAction<User>) => {
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