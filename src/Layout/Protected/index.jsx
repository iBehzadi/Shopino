import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Auth } from "../../Pages";

export default function Protected() {
  //   if (!token) {
  //     return <Navigate to={"/auth"} />;
  //   }

  // {
  //   isAuthenticated ? <Profile /> : <Login />;
  // }

  return (
    <>
      <Outlet />
    </>
  );
}
