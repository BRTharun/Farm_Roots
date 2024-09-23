import { configureStore } from "@reduxjs/toolkit";
import searchParamSlice from "../Reducer/searchParamSlice";
import headerLoginSlice from "../Reducer/headerLoginSlice";
import authSlice from "../Reducer/authSlice";
import cartSlice from "../Reducer/cartSlice";
import productsReducer from "../../utils/slices/products";
import vendorReducer from "../../utils/slices/vendorSlice";
import categoriesReducer from "../../utils/slices/category";
import subcategoryReducer from "../../utils/slices/subcategory";
import subcategoryProductsReducer from "../../utils/slices/subcategoryProducts";
import manufacturerReducer from "../../utils/slices/manufactuer";
import { CartItem } from "../../types/cartItem";
import userLoginReducer from "../../utils/slices/userLogin";
import newProfileReducer from "../../utils/slices/newVendor"


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
        cartObj: Record<string, CartItem>;
        total: {
            quantity: number;
            price: number;
        };
        cartVisibility: boolean;
    };
    product: ReturnType<typeof productsReducer>;
    vendor: ReturnType<typeof vendorReducer>;
    categories: ReturnType<typeof categoriesReducer>;
    subcategories: ReturnType<typeof subcategoryReducer>;
    subcategoryProducts: ReturnType<typeof subcategoryProductsReducer>;
    manufacturers: ReturnType<typeof manufacturerReducer>;
    userLogin:ReturnType<typeof userLoginReducer>;
    newProfile:ReturnType<typeof newProfileReducer>;
};

// Create the store
const store = configureStore({
    reducer: {
        headerLoginSlice: headerLoginSlice,
        searchParamSlice: searchParamSlice,
        authSlice: authSlice,
        cartSlice: cartSlice,
        product: productsReducer,
        vendor: vendorReducer,
        categories: categoriesReducer,
        subcategories: subcategoryReducer,
        subcategoryProducts: subcategoryProductsReducer,
        manufacturers: manufacturerReducer,
        userLogin: userLoginReducer,
        newProfile:newProfileReducer
    },
});

export type AppDispatch = typeof store.dispatch;

export default store;
