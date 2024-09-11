import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import VendorNavBar from "../common/vendor/VendorNavBar";
import VendorProducts from "../pages/vendor/VendorProducts";
import AddProduct from "../pages/vendor/AddProduct";
import VendorProfile from "../pages/vendor/VendorProfile";
import EditProduct from "../pages/vendor/EditPage";
import VendorCategoryPage from "../pages/vendor/VendorCategoryPage";
import SubcategoryPage from "../pages/vendor/SubcategoryPage";
import SubcategoryProductsPage from "../pages/vendor/SubcategoryProductsPage";
import ManufacturerProductsPage from "../pages/vendor/ManufacturerProductsPage";
import ManufacturersPage from "../pages/vendor/ManufacturersPage";
import { Provider } from "react-redux";
import vendorstore from "../utils/store/store";
import Header from "../common/Header/Header";
import Footer from "../common/Footer/UI/Footer";

const MyRoutes: React.FC = () => {
    return (
        <>
        <Header />
        <Routes>
            <Route path="/" element={<HomePage />} />
        </Routes>
        <Footer /> 
        </>
    );
};

export default MyRoutes;
