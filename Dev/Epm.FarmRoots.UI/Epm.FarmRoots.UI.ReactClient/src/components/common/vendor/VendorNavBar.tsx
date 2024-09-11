// src/App.tsx
import React from "react";
//import { BrowserRouter as Router } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";


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
