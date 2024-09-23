import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface Vendor {
    id: number;
    name: string;
    email: string;
    phoneNumber: string;
    password: string;
}

export interface VendorAddress {
    vendorAddressId: number;
    vendorShopName: string;
    houseNoAndFloor: string;
    buildingAndBlockNo: string;
    pincode: string;
    landmarkAndAreaName: string;
    vendorId: number;
}

export interface VendorState {
    vendor: Vendor | null;
    address: any|null;
    loading: boolean;
    error: string | null;
    profile: Vendor | null;
}

const initialState: VendorState = {
    vendor: null,
    address: null,
    loading: false,
    profile: null,
    error: null,
};

// Async thunks
export const fetchVendorProfile = createAsyncThunk<
    Vendor,
    { vendorId: number }
>("vendor/fetchVendorProfile", async ({ vendorId }, { rejectWithValue }) => {
    try {
        const response = await axios.get<Vendor>(
            `https://localhost:7116/api/Vendor/${vendorId}`
        );
        return response.data;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const fetchVendorAddress = createAsyncThunk<
    VendorAddress,
    { vendorId: number }
>("vendor/fetchVendorAddress", async ({ vendorId }, { rejectWithValue }) => {
    try {
        const response = await axios.get<VendorAddress>(
            `https://localhost:7116/api/Vendor/${vendorId}/GetAddresses`
        );
        console.log("lll",response.data)
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            console.log(error.response.data)
            return rejectWithValue(error.response.data);
        }
        return rejectWithValue({ message: "An unknown error occurred" });
    }
});

export const updateVendorProfile = createAsyncThunk<
    Vendor,
    { vendorId: number; profileData: Partial<Vendor> }
>("vendor/updateVendorProfile", async ({ vendorId, profileData }) => {
    const response = await axios.put<Vendor>(
        `https://localhost:7116/api/Customer/UpdateCustomer/${vendorId}`,
        profileData
    );
    return response.data;
});

export const updateVendorAddress = createAsyncThunk<
    VendorAddress[],
    { vendorId: any; addressId: any; addressData: any }
>("vendor/updateVendorAddress", async ({ vendorId, addressId, addressData }) => {
    const response = await axios.put<VendorAddress>(
        `https://localhost:7116/api/Vendor/${vendorId}/addresses/${addressId}`,
        addressData
    );
    console.log([response.data])
    return [response.data];
});

export const addVendorAddress = createAsyncThunk<
    VendorAddress[],
    { vendorId: number, addressData: VendorAddress }
>("vendor/addVendorAddress", async ({ vendorId, addressData }, { rejectWithValue }) => {
    try {
        const response = await axios.post<VendorAddress>(
            `https://localhost:7116/api/Vendor/vendors/${vendorId}/AddAddresses`,
            addressData
        );
        console.log('ldj',[response.data]);
        return [response.data];
        } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return rejectWithValue(error.response.data);
        }
        return rejectWithValue({ message: "An unknown error occurred" });
    }
});


const vendorSlice = createSlice({
    name: "vendor",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchVendorProfile.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchVendorProfile.fulfilled, (state, action) => {
                state.profile = action.payload;
                state.loading = false;
            })
            .addCase(fetchVendorProfile.rejected, (state, action) => {
                state.error = action.payload as string;
                state.loading = false;
            })
            .addCase(fetchVendorAddress.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchVendorAddress.fulfilled, (state, action) => {
                state.address = action.payload;
                state.loading = false;
            })
            .addCase(fetchVendorAddress.rejected, (state, action) => {
                state.error = action.payload as string;
                state.loading = false;
            })
            .addCase(updateVendorProfile.fulfilled, (state, action) => {
                state.profile = action.payload;
            })
            .addCase(updateVendorAddress.fulfilled, (state, action) => {
                state.address = action.payload;
                state.loading=false;
            })
            .addCase(addVendorAddress.pending, (state) => {
                state.loading = true;
            })
            .addCase(addVendorAddress.fulfilled, (state, action) => {
                state.address = action.payload;
                state.loading = false;
                state.error=null;
            })
            .addCase(addVendorAddress.rejected, (state, action) => {
                state.error = action.payload as string;
                state.loading = false;
            })
    },
});

export default vendorSlice.reducer;