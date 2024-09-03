// src/redux/productsSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "./store";

// Define a type for the product
export interface Product {
    _id?: string;
    name: string;
    category: string;
    image: string;
    description: string;
    stock: number;
    tags: string[];
    regularPrice: number;
    salePrice: number;
    publish: boolean;
    vendor?: string; // Optional field for vendor ID
}

// Define a type for the slice state
interface ProductsState {
    products: Product[];
    vendorProducts: Product[];
    status: "idle" | "loading" | "succeeded" | "failed";
    loading:boolean;
    error: string | null;
}

// Initial state
const initialState: ProductsState = {
    products: [],
    vendorProducts: [],
    status: "idle",
    loading: false,
    error: null,
};

// Create an async thunk for fetching products
export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async () => {
        const response = await axios.get("http://localhost:5000/api/products");
        return response.data;
    }
);

export const fetchVendorProducts = createAsyncThunk(
    "products/fetchVendorProducts",
    async (_, { getState, rejectWithValue }) => {
        const state = getState() as RootState;
        const token = state.vendor.vendor?.token; // Adjust this based on where the token is stored

        if (!token) {
            return rejectWithValue("No token found");
        }

        try {
            const response = await axios.get(
                "http://localhost:5000/api/vendors/products",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data || "Failed to fetch vendor products");
            }
            return rejectWithValue("Failed to fetch vendor products");
        }
    }
);


// Create an async thunk for adding a product
export const addProduct = createAsyncThunk(
    "products/addProduct",
    async (product: Product, { rejectWithValue, getState }) => {
        const state = getState() as RootState;
        console.log("state here", state);
        console.log("product", product);

        // Access the token based on where it is actually stored
        const token = state.vendor.vendor?.token; // Adjust this based on where the token is stored
        console.log("token", token); // Assuming token is stored in auth slice

        try {
            const response = await axios.post(
                "http://localhost:5000/api/vendors/products",
                product,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(
                    error.response?.data || "Failed to add product"
                );
            }
            return rejectWithValue("Failed to add product");
        }
    }
);
// Create the slice
const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = "failed";
                state.error =
                    action.error.message || "Failed to fetch products";
            })
            .addCase(fetchVendorProducts.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchVendorProducts.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.vendorProducts = action.payload;
            })
            .addCase(fetchVendorProducts.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || "Failed to fetch vendor products";
            })
            .addCase(addProduct.pending, (state) => {
                state.status = "loading";
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.products.push(action.payload);
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || "Failed to add product";
            });
    },
});

export default productsSlice.reducer;
