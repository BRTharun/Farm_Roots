// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//import VendorNavBar from "./components/navbar/VendorNavBar";
import VendorProducts from "./components/pages/vendor/VendorProducts";
import AddProduct from "./components/pages/vendor/AddProduct";
import VendorProfile from "./components/pages/vendor/VendorProfile";
import VendorNavBar from "./components/navbar/VendorNavBar";


const App: React.FC = () => {

    return (
        <Router>
                <VendorNavBar/>
                <Routes>
                        <Route path="/" element ={<VendorNavBar/>}></Route>
                        <Route path="/add-product" element={<AddProduct />} />
                        <Route
                            path="/my-products"
                            element={<VendorProducts />}
                        />
                        <Route
                            path="/vendor-profile"
                            element={<VendorProfile />}
                        />
                </Routes>
        </Router>
    );
};

export default App;
