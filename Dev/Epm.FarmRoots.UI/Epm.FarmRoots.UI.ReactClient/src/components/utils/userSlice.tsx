// src/redux/userSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { LOGIN_USER, REGISTER_USER } from "./constants/Api";

//------------------------------
// Types
//------------------------------
/**
 * Type definition for a User.
 */
interface User {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
}

/**
 * Type definition for the user slice state.
 */
interface UserState {
    user: User | null;
    loading: boolean;
    error: string | null;
}

//------------------------------
// Initial State
//------------------------------
/**
 * Initial state for the user slice.
 */
const initialState: UserState = {
    user: null,
    loading: false,
    error: null,
};

//------------------------------
// Async Thunks
//------------------------------
/**
 * Async thunk for logging in a user.
 * Performs an API request to log in and returns user data.
 */
export const loginUser = createAsyncThunk<
    User,
    { email: string; password: string }
>("user/login", async (userData) => {
    const response = await axios.post<User>(LOGIN_USER, userData);
    console.log("lll", response.data); // Debugging output
    return response.data;
});

/**
 * Async thunk for registering a new user.
 * Performs an API request to register and returns user data.
 */
export const registerUser = createAsyncThunk<
    User,
    { firstName: string; lastName: string; email: string; password: string }
>("user/register", async (userData) => {
    console.log("userData", userData); // Debugging output
    const response = await axios.post<User>(REGISTER_USER, userData);
    return response.data;
});

/**
 * Async thunk for logging out a user.
 * Performs any necessary logout operations.
 */
export const logoutUser = createAsyncThunk("user/logout", async () => {
    // Perform any necessary logout operations
    localStorage.removeItem("user");
});

//------------------------------
// Slice
//------------------------------
/**
 * User slice that contains the reducer and actions related to user state.
 */
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.error = action.error.message || "Login failed";
                state.loading = false;
            })
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.error = action.error.message || "Registration failed";
                state.loading = false;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
            });
    },
});

export default userSlice.reducer;
