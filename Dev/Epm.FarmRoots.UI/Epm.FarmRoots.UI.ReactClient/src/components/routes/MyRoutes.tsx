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

const MyRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            
            <Route path="/vendor" element={<VendorNavBar />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/my-products" element={<VendorProducts />} />
            <Route path="/vendor-profile" element={<VendorProfile />} />
            <Route path="/vendor-edit/:id" element={<EditProduct />} />
            <Route path="/vendor-category" element={<VendorCategoryPage />} />
            <Route
                path="/subcategories/:categoryId"
                element={<SubcategoryPage />}
            />
            <Route
                path="/subcategory-products/:subcategoryId"
                element={<SubcategoryProductsPage />}
            />
            <Route path="/manufacturers" element={<ManufacturersPage />} />
            <Route
                path="/manufacturer-products/:manufacturerId"
                element={<ManufacturerProductsPage />}
            />
        </Routes>
    );
};

export default MyRoutes;
