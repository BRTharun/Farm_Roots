// src/redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../slices/products";
import userReducer from "../slices/userSlice";
import vendorReducer from "../slices/vendorSlice";
import categoriesReducer from '../slices/category';
import subcategoryReducer from "../slices/subcategory";
import subcategoryProductsReducer from "../slices/subcategoryProducts";
import manufacturerReducer from "../slices/manufactuer";

const vendorstore = configureStore({
    reducer: {
        product: productsReducer,
        user: userReducer,
        vendor: vendorReducer,
        categories: categoriesReducer,
        subcategories: subcategoryReducer,
        subcategoryProducts: subcategoryProductsReducer,
        manufacturers:manufacturerReducer
    },

});

export type RootState = ReturnType<typeof vendorstore.getState>;
export type AppDispatch = typeof vendorstore.dispatch;

export default vendorstore;
