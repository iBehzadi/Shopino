import React from "react";
import { Outlet } from "react-router-dom";
import { Footer, Navbar } from "../Components";

export default function Layout() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
