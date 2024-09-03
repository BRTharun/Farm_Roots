// src/redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./products";
import userReducer from "./userSlice";
import vendorReducer from "./vendorSlice";

const store = configureStore({
    reducer: {
        product: productsReducer,
        user: userReducer,
        vendor: vendorReducer
    },
    
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
