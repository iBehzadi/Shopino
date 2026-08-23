import React from "react";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <main className="min-h-screen">
        <Outlet />
      </main>
    </>
  );
}
