import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function Protected() {
//   if (!token) {
//     return <Navigate to={"/auth"} />;
//   }
  return (
    <>
      <Outlet />
    </>
  );
}
