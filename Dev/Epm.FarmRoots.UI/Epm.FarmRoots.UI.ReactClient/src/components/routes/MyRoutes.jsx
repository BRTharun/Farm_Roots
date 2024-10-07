import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import RegisterPage from "../pages/RegisterPage";
import Cart from "../common/Cart/Cart";
import ProductsPage from "../pages/ProductsPage";
import AccountMenuSection from "../common/Header/UI/AccountMenuSection";
// import ProductDetailsPage from "../pages/ProductDetailsPage"; // Assuming you have a page for product details


const MyRoutes = () => {
    return (
        <Routes>
            {/* Define the routes with parameters */}
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/pl/:mainCategoryId" element={<ProductsPage />} />
            <Route path="/account/*" element={<AccountMenuSection/>} />
            <Route path="/cart" element={<Cart/>} />
            {/* <Route path="/product/:productId" element={<ProductDetailsPage />} /> Optional, if you have a product details page */}
        </Routes>
    );
};

export default MyRoutes;
