import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../../Store/authStore";

export default function Protected() {
  const { token } = useAuthStore();
  const location = useLocation();
  if (!token) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }
  return (
    <>
      <Outlet />
    </>
  );
}
