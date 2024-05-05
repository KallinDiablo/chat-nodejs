import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  accessToken: string | null;
  // Other relevant user-related state
}

const initialState: AuthState = {
  accessToken: null,
  // Initialize other state properties
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string | null>) => {
      state.accessToken = action.payload;
    },
    // Other reducers for login, logout, etc.
  },
});

export const { setAccessToken } = authSlice.actions;
export default authSlice.reducer;