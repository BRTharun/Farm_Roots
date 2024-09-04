// src/redux/productsSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "./store";
import { ADD_PRODUCT, GET_PRODUCTS, VENDOR_PRODUCTS } from "./constants/Api";

//------------------------------
// Product Type Definition
//------------------------------
/**
 * Defines the shape of a Product object.
 * @property _id Optional field for the product ID.
 * @property productName Name of the product.
 * @property productCategory Category of the product.
 * @property productImage URL of the product image.
 * @property productDescription Description of the product.
 * @property productStock Number of items in stock.
 * @property productSale_Price Sale price of the product.
 * @property productMrp Maximum retail price of the product.
 */
export interface Product {
    _id?: string;
    productName: string;
    productCategory: string;
    productImage: string;
    productDescription: string;
    productStock: number;
    productSale_Price: number;
    productMrp: number;
}

//------------------------------
// ProductsState Type Definition
//------------------------------
/**
 * Defines the shape of the Products slice state.
 * @property products Array of products.
 * @property vendorProducts Array of vendor-specific products.
 * @property status Current status of the data fetching (idle, loading, succeeded, failed).
 * @property loading Boolean flag indicating whether data is being loaded.
 * @property error Error message if any error occurs during data fetching.
 */
interface ProductsState {
    products: Product[];
    vendorProducts: Product[];
    status: "idle" | "loading" | "succeeded" | "failed";
    loading: boolean;
    error: string | null;
}

//------------------------------
// Initial State
//------------------------------
const initialState: ProductsState = {
    products: [],
    vendorProducts: [],
    status: "idle",
    loading: false,
    error: null,
};

//------------------------------
// Async Thunks
//------------------------------

/**
 * Fetches all products from the API.
 * @returns Array of products.
 */
export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async () => {
        const response = await axios.get(GET_PRODUCTS);
        return response.data;
    }
);

/**
 * Fetches vendor-specific products from the API with authorization.
 * @returns Array of vendor products.
 * @throws Rejects with error message if token is not found or request fails.
 */
export const fetchVendorProducts = createAsyncThunk(
    "products/fetchVendorProducts",
    async (_, { getState, rejectWithValue }) => {
        const state = getState() as RootState;
        const token = state.vendor.vendor?.token; // Adjust this based on where the token is stored

        if (!token) {
            return rejectWithValue("No token found");
        }

        try {
            const response = await axios.get(VENDOR_PRODUCTS, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(
                    error.response?.data || "Failed to fetch vendor products"
                );
            }
            return rejectWithValue("Failed to fetch vendor products");
        }
    }
);

/**
 * Adds a new product to the API.
 * @param product Product details to be added.
 * @returns The added product.
 * @throws Rejects with error message if the request fails.
 */
export const addProduct = createAsyncThunk(
    "products/addProduct",
    async (product: Product, { rejectWithValue, getState }) => {
        const state = getState() as RootState;
        const token = state.vendor.vendor?.token; // Adjust this based on where the token is stored
        console.log("jdkf", product);
        try {
            const response = await axios.post(ADD_PRODUCT, product, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
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

//------------------------------
// Products Slice
//------------------------------
/**
 * Creates a Redux slice for managing product data.
 * Handles product fetching, vendor product fetching, and product addition.
 */
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
                state.error =
                    action.error.message || "Failed to fetch vendor products";
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
