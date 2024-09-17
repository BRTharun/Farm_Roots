import React from "react";
import "./App.css";
import "@epam/uui-components/styles.css";
import "@epam/uui/styles.css";
import Header from "./components/common/Header/Header";
import Footer from "./components/common/Footer/UI/Footer";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import SignIn from "./client/src/components/SignIn";
import HomePage from "./components/pages/HomePage";
import CategoryHomePage from "./components/pages/products/CategoryHomePage";
import CategoryPage from "./components/pages/products/CategoryPage";
import ProductDetailPage from "./components/pages/products/ProductDetailPage";
import VendorNavBar from "./components/common/vendor/VendorNavBar";
import VendorProducts from "./components/pages/vendor/VendorProducts";
import AddProduct from "./components/pages/vendor/AddProduct";
import VendorProfile from "./components/pages/vendor/VendorProfile";
import EditProduct from "./components/pages/vendor/EditPage";
import SubcategoryPage from "./components/pages/vendor/SubcategoryPage";
import SubcategoryProductsPage from "./components/pages/vendor/SubcategoryProductsPage";
import ManufacturerProductsPage from "./components/pages/vendor/ManufacturerProductsPage";
import ManufacturersPage from "./components/pages/vendor/ManufacturersPage";
import VendorCategoryPage from "./components/pages/vendor/VendorCategoryPage";
import { useSelector } from "react-redux";
import { RootState } from "./components/store/MainStore/store";

const App: React.FC = () => {
    const role = useSelector((state: any) => state.userLogin.userLogin?.role);

    return (
        <Router>
            {role !== "vendor" && <Header />}
            <div className="">
                <Routes>

                <Route path="/" element={<SignIn />} />
                    {role === "customer" && (
                        <>
                            

                            {/* Common routes */}
                            <Route path="/home" element={<HomePage />} />
                            <Route
                                path="/category/:categoryName"
                                element={<CategoryPage />}
                            />
                            <Route
                                path="/product/:productId"
                                element={<ProductDetailPage />}
                            />
                        </>
                    )}
                    {/* Vendor-specific routes */}
                    {role === "vendor" && (
                        <>
                            <Route
                                path="/add-product"
                                element={<AddProduct />}
                            />
                            <Route
                                path="/my-products"
                                element={<VendorProducts />}
                            />
                            <Route
                                path="/vendor-profile"
                                element={<VendorProfile />}
                            />
                            <Route
                                path="/vendor-edit/:id"
                                element={<EditProduct />}
                            />
                            <Route
                                path="/vendor-category"
                                element={<VendorCategoryPage />}
                            />
                            <Route
                                path="/subcategories/:categoryId"
                                element={<SubcategoryPage />}
                            />
                            <Route
                                path="/subcategory-products/:subcategoryId"
                                element={<SubcategoryProductsPage />}
                            />
                            <Route
                                path="/manufacturers"
                                element={<ManufacturersPage />}
                            />
                            <Route
                                path="/manufacturer-products/:manufacturerId"
                                element={<ManufacturerProductsPage />}
                            />
                        </>
                    )}

                    {/* Fallback to sign in if no role */}
                    {role !== "customer" && role !== "vendor" && (
                        <Route path="*" element={<Navigate to="/" />} />
                    )}
                </Routes>
            </div>
            {role !== "vendor" && <Footer />}
        </Router>
    );
};

export default App;
