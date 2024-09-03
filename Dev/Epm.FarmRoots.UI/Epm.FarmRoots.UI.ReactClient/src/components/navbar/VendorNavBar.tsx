// src/App.tsx
import React from "react";
//import { BrowserRouter as Router } from "react-router-dom";
import Sidebar from "../pages/vendor/Sidebar";
import TopBar from "../pages/vendor/TopBar";


const VendorNavBar: React.FC = () => {
    return (
        <>
            <div className="flex h bg-background">
                <Sidebar />
                <div>
                    <TopBar />
                </div>
            </div>
        </>
    );
};

export default VendorNavBar;
