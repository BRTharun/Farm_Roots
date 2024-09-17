import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store/store";

// Define a type for the product
export interface Product {
    _id?: string;
    productName: string;
    productType: string;
    shortDescription: string;
    fullDescription: string;
    productCondition: string;
    productTags: string[];
    published: boolean;
    vendorId: number;
}

// Define a type for the price
export interface Price {
    priceId?: number;
    salePrice: number;
    mrp: number;
    specialPrice: number;
    specialPriceFromDate: string;
    specialPriceToDate: string;
    discount: number;
    productCost: number;
    isBuyButtonDisabled: boolean;
    productId: number;
}

// Define a type for the slice state
interface ProductsState {
    products: Product[];
    vendorProducts: Product[];
    status: "idle" | "loading" | "succeeded" | "failed";
    loading: boolean;
    error: string | null;
    editProduct: { product: Product } | null;
}

// Initial state
const initialState: ProductsState = {
    products: [],
    vendorProducts: [],
    status: "idle",
    loading: false,
    error: null,
    editProduct: null,
};

export const addProduct = createAsyncThunk(
    "products/addProduct",
    async (product: Product, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                "https://localhost:7189/api/products",
                product
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

export const addPrice = createAsyncThunk(
    "products/addPrice",
    async (price: Price, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                "https://localhost:7189/api/Price",
                price
            );
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(
                    error.response?.data || "Failed to add price"
                );
            }
            return rejectWithValue("Failed to add price");
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
            })
            .addCase(addPrice.pending, (state) => {
                state.status = "loading";
            })
            .addCase(addPrice.fulfilled, (state, action) => {
                state.status = "succeeded";
            })
            .addCase(addPrice.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || "Failed to add price";
            });
    },
});

export default productsSlice.reducer;
