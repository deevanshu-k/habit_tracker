import React from "react";
import { useSelector } from "react-redux";
import { StoreState } from "../../store/store.type";
import { Navigate, Outlet } from "react-router";

const UnProtectedRoute: React.FC = () => {
    const user = useSelector((state: StoreState) => state.auth.user);

    return user ? <Navigate to="/" /> : <Outlet />;
};

export default UnProtectedRoute;
