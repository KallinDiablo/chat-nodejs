import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  profile: {};
  // Other relevant user-related state
}

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  profile: {},
  // Initialize other state properties
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string | null>) => {
      state.accessToken = action.payload;
    },
    setRefreshToken: (state, action: PayloadAction<string | null>) => {
      state.refreshToken = action.payload;
    },
    setProfile: (state, action: PayloadAction<{}>) => {
      state.profile = action.payload;
    },
    logOut: (state, action: PayloadAction<null>) => {
      state.accessToken = null;
      state.refreshToken = null;
    },
    // Other reducers for login, logout, etc.
  },
});

export const { setAccessToken, setRefreshToken, setProfile, logOut } =
  authSlice.actions;
export default authSlice.reducer;
