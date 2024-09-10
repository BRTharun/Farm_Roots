import { configureStore } from "@reduxjs/toolkit";
import searchParamSlice from "../Reducer/searchParamSlice";
import headerLoginSlice from "../Reducer/headerLoginSlice";
import authSlice from "../Reducer/authSlice";
import cartSlice from "../Reducer/cartSlice";
import { CartItem } from "../../types/cartItem";

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
  cartSlice: { // Add cartSlice to RootState
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
    authSlice : authSlice,
    cartSlice: cartSlice,
  },
});

// Export the store and RootState type
export default store;
export type AppDispatch = typeof store.dispatch;
