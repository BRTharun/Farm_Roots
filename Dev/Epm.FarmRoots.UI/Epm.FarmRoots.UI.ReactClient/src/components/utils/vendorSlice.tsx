// src/redux/vendorSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
    GET_VENDOR_PROFILE,
    LOGIN_VENDOR,
    REGISTER_VENDOR,
} from "./constants/Api";

//------------------------------
// Types
//------------------------------
/**
 * Type definition for a Vendor.
 */
export interface Vendor {
    id: string;
    companyName: string;
    contactName: string;
    email: string;
    phone: string;
    role: string;
    token?: string; // Optional field for authentication token
}

/**
 * Type definition for the vendor slice state.
 */
export interface VendorState {
    vendor: Vendor | null;
    loading: boolean;
    error: string | null;
    profile: Vendor | null;
}

//------------------------------
// Initial State
//------------------------------
/**
 * Initial state for the vendor slice.
 */
const initialState: VendorState = {
    vendor: null,
    loading: false,
    profile: null,
    error: null,
};

//------------------------------
// Async Thunks
//------------------------------
/**
 * Async thunk for logging in a vendor.
 * Performs an API request to log in and returns vendor data.
 */
export const loginVendor = createAsyncThunk<
    Vendor,
    { email: string; password: string }
>("vendor/login", async (vendorData) => {
    const response = await axios.post<Vendor>(LOGIN_VENDOR, vendorData);
    return response.data;
});

/**
 * Async thunk for registering a new vendor.
 * Performs an API request to register and returns vendor data.
 */
export const registerVendor = createAsyncThunk<
    Vendor,
    {
        companyName: string;
        contactName: string;
        email: string;
        password: string;
        phone: string;
    }
>("vendor/register", async (vendorData) => {
    const response = await axios.post<Vendor>(REGISTER_VENDOR, vendorData);
    return response.data;
});

/**
 * Async thunk for fetching the vendor's profile.
 * Retrieves vendor profile data from the API using an authentication token.
 */
export const fetchVendorProfile = createAsyncThunk<
    Vendor,
    void,
    { state: { vendor: VendorState } }
>("vendor/fetchVendorProfile", async (_, { getState, rejectWithValue }) => {
    const state = getState() as { vendor: VendorState };
    const token = state.vendor.vendor?.token;

    if (!token) {
        return rejectWithValue("No token found");
    }

    try {
        const response = await axios.get<Vendor>(GET_VENDOR_PROFILE, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return rejectWithValue(
                error.response?.data || "Failed to fetch vendor profile"
            );
        }
        return rejectWithValue("Failed to fetch vendor profile");
    }
});

/**
 * Async thunk for logging out a vendor.
 * Performs necessary operations for logging out.
 */
export const logoutVendor = createAsyncThunk("vendor/logout", async () => {
    // Perform any necessary logout operations
    localStorage.removeItem("vendor");
});

//------------------------------
// Slice
//------------------------------
/**
 * Vendor slice that contains the reducer and actions related to vendor state.
 */
const vendorSlice = createSlice({
    name: "vendor",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginVendor.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginVendor.fulfilled, (state, action) => {
                state.vendor = action.payload;
                state.loading = false;
            })
            .addCase(loginVendor.rejected, (state, action) => {
                state.error = action.error.message || "Login failed";
                state.loading = false;
            })
            .addCase(registerVendor.pending, (state) => {
                state.loading = true;
            })
            .addCase(registerVendor.fulfilled, (state, action) => {
                state.vendor = action.payload;
                state.loading = false;
            })
            .addCase(registerVendor.rejected, (state, action) => {
                state.error = action.error.message || "Registration failed";
                state.loading = false;
            })
            .addCase(fetchVendorProfile.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchVendorProfile.fulfilled, (state, action) => {
                state.profile = action.payload;
                state.loading = false;
            })
            .addCase(fetchVendorProfile.rejected, (state, action) => {
                state.error =
                    action.error.message || "Failed to fetch vendor profile";
                state.loading = false;
            })
            .addCase(logoutVendor.fulfilled, (state) => {
                state.vendor = null;
            });
    },
});

export default vendorSlice.reducer;
