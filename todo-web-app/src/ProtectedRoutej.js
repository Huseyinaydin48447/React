import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import MaınLayout from "./layout/MaınLayout";
import secureLocalStorage from "react-secure-storage";

export const ProtectedRoute = () => {

    const isAuthenticated = secureLocalStorage.getItem('userData') //localstronge yerine  secureLocalStorage kullanır.  gizili yapar
    if (!isAuthenticated) {
        return <Navigate to='/login' replace />
    }
    return (
        <MaınLayout>
        <Outlet />
        </MaınLayout>
    );
};