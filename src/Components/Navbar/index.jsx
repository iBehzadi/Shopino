import React, { useEffect, useState } from "react";
import { BiShoppingBag, BiMenu, BiX } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "خانه", path: "/" },
    { name: "محصولات", path: "/products" },
    { name: "درباره ما", path: "/about" },
  ];

  return (
    <nav className="fixed left-0 right-0 z-50 bg-white ">
      <div className={`mx-auto flex max-w-7xl items-center justify-between px-4 py-4 transition-all duration-300 ${scrolled ? 'shadow w-[90%]' : ''}`}>
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          شاپینو
        </Link>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-6 sm:flex">
          {navLinks.map((link) => (
            <Link
              to={link.path}
              key={link.name}
              className="group relative text-gray-700 hover:text-blue-600"
            >
              {link.name}

              <span
                className={`absolute left-0 -bottom-1 h-0.5 bg-orange-500 transition-all duration-300 ${
                  location.pathname === link.path
                    ? "w-full"
                    : "w-0 group-hover:w-full"
                }`}
              />
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-4 sm:flex">
          <input
            type="text"
            placeholder="جستجو"
            className="hidden rounded border border-orange-300 px-4 py-2 outline-0 md:block"
          />

          <Link
            to="/cart"
            className="text-xl text-gray-700 hover:text-blue-600"
          >
            <BiShoppingBag />
          </Link>

          <Link to="/auth" className="text-gray-700 hover:text-blue-600">
            ورود/ثبت نام
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(true)}
          className="text-3xl text-gray-700 sm:hidden"
        >
          <BiMenu />
        </button>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/40 sm:hidden"
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed right-0 top-0 h-full w-72 bg-white p-6 shadow-xl transition-transform duration-300 sm:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close */}
        <div className="mb-8 flex items-center justify-between">
          <span className="text-xl font-bold text-blue-600">شاپینو</span>

          <button
            onClick={() => setIsOpen(false)}
            className="text-3xl text-gray-700"
          >
            <BiX />
          </button>
        </div>

        {/* Mobile Links */}
        <div className="flex flex-col gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`text-lg ${
                location.pathname === link.path
                  ? "font-bold text-orange-500"
                  : "text-gray-700"
              }`}
            >
              {link.name}
            </Link>
          ))}

          <hr />

          <Link
            to="/cart"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 text-gray-700"
          >
            <BiShoppingBag />
            سبد خرید
          </Link>

          <Link
            to="/auth"
            onClick={() => setIsOpen(false)}
            className="text-gray-700"
          >
            ورود / ثبت نام
          </Link>
        </div>
      </div>
    </nav>
  );
}
