import React from "react";
import { Outlet } from "react-router-dom";
import { Footer, Navbar } from "../Components";
import ScrollToTop from "../Components/ScrollToTop";

export default function Layout() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main className="min-h-[70vh]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
