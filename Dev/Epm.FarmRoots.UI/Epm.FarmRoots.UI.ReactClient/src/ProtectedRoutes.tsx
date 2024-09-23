// src/components/ProtectedRoute.tsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./components/store/MainStore/store";

interface ProtectedRouteProps {
    allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
    const user = useSelector((state: RootState) => state.userLogin.userLogin);
    //const vendor = useSelector((state: RootState) => state.vendor?.vendor);

    const isAuthorized = allowedRoles.includes(
        user || ""
    );

    if (!isAuthorized) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
