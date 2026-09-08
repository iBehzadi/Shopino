import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../Store/authStore";

export default function Protected() {
  const { token } = useAuthStore();
  if (!token) {
    return <Navigate to={"/auth"} />;
  }
  return (
    <>
      <Outlet />
    </>
  );
}
