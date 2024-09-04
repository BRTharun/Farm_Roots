// src/redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productsSlice";
import userReducer from "./userSlice";
import vendorReducer from "./vendorSlice";

//------------------------------
// Redux Store Configuration
//------------------------------
/**
 * Configures and creates the Redux store.
 * Combines multiple reducers into a single store.
 */
const store = configureStore({
    reducer: {
        product: productsReducer,
        user: userReducer,
        vendor: vendorReducer,
    },
});

//------------------------------
// Type Definitions
//------------------------------
/**
 * Type for the root state of the Redux store.
 * Uses TypeScript's ReturnType to infer the state shape from the store.
 */
export type RootState = ReturnType<typeof store.getState>;

/**
 * Type for the dispatch function of the Redux store.
 * Allows TypeScript to infer the types for dispatching actions.
 */
export type AppDispatch = typeof store.dispatch;

//------------------------------
// Export the store
//------------------------------
/**
 * Exports the configured Redux store for use in the application.
 */
export default store;
