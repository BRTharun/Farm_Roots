import React from "react";
import { Routes, Route } from "react-router-dom";

import HomePage from "../pages/HomePage";
import CategoryHomePage from '../pages/products/CategoryHomePage';
import CategoryPage from '../pages/products/CategoryPage';
import ProductDetailPage from '../pages/products/ProductDetailPage';
import '../../assets/styles/ProductRoutes.css';


import Header from "../common/Header/Header";
import Footer from "../common/Footer/UI/Footer";

const MyRoutes: React.FC = () => {

    return (
        <>
        <Header />
        <Routes>
            {/* <Route path="/" element={<HomePage />} /> */}
            <Route path="/" element={<CategoryHomePage />} />
            <Route path="/category/:categoryName" element={<CategoryPage />} />
            <Route path="/product/:productId" element={<ProductDetailPage />} />
            <Route path="/" element={<HomePage />} />
        </Routes>
        <Footer /> 
        </>
    );
};

export default MyRoutes;
