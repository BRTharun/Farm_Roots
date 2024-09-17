import React from "react";
import { Routes, Route } from "react-router-dom";
import VendorNavBar from "../common/vendor/VendorNavBar";
import VendorProducts from "../pages/vendor/VendorProducts";
import AddProduct from "../pages/vendor/AddProduct";
import VendorProfile from "../pages/vendor/VendorProfile";
import EditProduct from "../pages/vendor/EditPage";
import SubcategoryPage from "../pages/vendor/SubcategoryPage";
import SubcategoryProductsPage from "../pages/vendor/SubcategoryProductsPage";
import ManufacturerProductsPage from "../pages/vendor/ManufacturerProductsPage";
import ManufacturersPage from "../pages/vendor/ManufacturersPage";
import VendorCategoryPage from "../pages/vendor/VendorCategoryPage";

const VendorRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/vendor" element={<VendorNavBar />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/my-products" element={<VendorProducts />} />
            <Route path="/vendor-profile" element={<VendorProfile />} />
            <Route path="/vendor-edit/:id" element={<EditProduct />} />
            <Route path="/vendor-category" element={<VendorCategoryPage />} />
            <Route path="/subcategories/:categoryId" element={<SubcategoryPage />} />
            <Route path="/subcategory-products/:subcategoryId" element={<SubcategoryProductsPage />} />
            <Route path="/manufacturers" element={<ManufacturersPage />} />
            <Route path="/manufacturer-products/:manufacturerId" element={<ManufacturerProductsPage />} />
        </Routes>
    );
};

export default VendorRoutes;