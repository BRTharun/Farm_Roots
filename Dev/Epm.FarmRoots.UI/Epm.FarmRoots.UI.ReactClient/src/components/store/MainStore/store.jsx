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
import mainCategorySlice from "../Reducer/mainCategorySlice";

const store = configureStore({
    reducer: {
        headerLoginSlice: headerLoginSlice.reducer,
        searchParamSlice: searchParamSlice.reducer,
        mainCategorySlice: mainCategorySlice,
        authSlice: authSlice.reducer,
        cartSlice: cartSlice.reducer,
        // product: productsReducer.reducer,
        // vendor: vendorReducer.reducer,
        // categories: categoriesReducer.reducer,
        // subcategories: subcategoryReducer.reducer,
        // subcategoryProducts: subcategoryProductsReducer.reducer,
        // manufacturers: manufacturerReducer.reducer,
    },
});

export default store;
