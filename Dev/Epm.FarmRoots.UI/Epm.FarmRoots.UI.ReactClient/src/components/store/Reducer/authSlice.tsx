import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the type for the slice state
interface AuthState {
  auth: boolean;
  [key: string]: unknown; // Allows for additional properties
}

// Define the initial state using the AuthState type
const initialState: AuthState = {
  auth: false,
};

// Create the slice
const authSlice = createSlice({
  name: "user/auth",
  initialState,
  reducers: {
    // Action to authenticate the user and possibly update state with additional properties
    authUser: (state, action: PayloadAction<Partial<AuthState>>) => {
      state.auth = true;
      Object.assign(state, action.payload);
    },
    // Action to update user details
    updateUser: (state, action: PayloadAction<Partial<AuthState>>) => {
      Object.assign(state, action.payload);
    },
    // Action to log out the user
    logoutUser: () => {
      return { auth: false };
    },
  },
});

// Export the reducer and actions
export default authSlice.reducer;
export const { authUser, updateUser, logoutUser } = authSlice.actions;
