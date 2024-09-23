import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
//import CategoryHomePage from '../pages/products/CategoryHomePage';
import CategoryPage from '../pages/products/CategoryPage';
import ProductDetailPage from '../pages/products/ProductDetailPage';
import '../../assets/styles/ProductRoutes.css';

const MyRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/category/:categoryName" element={<CategoryPage />} />
            <Route path="/product/:productId" element={<ProductDetailPage />} />
            {/* Add other customer routes here */}
        </Routes>
    );
};

export default MyRoutes;