import React from "react";
import { useSelector } from "react-redux";
import { StoreState } from "../../store/store.type";
import { Navigate, Outlet } from "react-router";

const ProtectedRoute: React.FC = () => {
    const user = useSelector((state: StoreState) => state.auth.user);

    return user ? <Outlet /> : <Navigate to="/signin" />;
};

export default ProtectedRoute;
