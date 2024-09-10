import { configureStore } from "@reduxjs/toolkit";
import searchParamSlice from "../Reducer/searchParamSlice";
import headerLoginSlice from "../Reducer/headerLoginSlice";
import authSlice from "../Reducer/authSlice";
import cartSlice from "../Reducer/cartSlice";
import { CartItem } from "../../types/cartItem";
import productsReducer from "../../utils/slices/products";
import userReducer from "../../utils/slices/userSlice";
import vendorReducer from "../../utils/slices/vendorSlice";
import categoriesReducer from "../../utils/slices/category";
import subcategoryReducer from "../../utils/slices/subcategory";
import subcategoryProductsReducer from "../../utils/slices/subcategoryProducts";
import manufacturerReducer from "../../utils/slices/manufactuer";

// Define the shape of your root state
export type RootState = {
    headerLoginSlice: {
        loginComponent: boolean;
    };
    searchParamSlice: {
        param: string;
    };
    authSlice: {
        auth: boolean;
        [key: string]: unknown; // Allows for additional properties from authSlice
    };
    cartSlice: {
        // Add cartSlice to RootState
        cartObj: Record<string, CartItem>;
        total: {
            quantity: number;
            price: number;
        };
        cartVisibility: boolean;
    };
};

// Create the store
const store = configureStore({
    reducer: {
        headerLoginSlice: headerLoginSlice,
        searchParamSlice: searchParamSlice,
        authSlice: authSlice,
        cartSlice: cartSlice,
        product: productsReducer,
        user: userReducer,
        vendor: vendorReducer,
        categories: categoriesReducer,
        subcategories: subcategoryReducer,
        subcategoryProducts: subcategoryProductsReducer,
        manufacturers: manufacturerReducer,
    },
});

// Export the store and RootState type
export default store;
export type AppDispatch = typeof store.dispatch;
export type VendorRootState = ReturnType<typeof store.getState>;
