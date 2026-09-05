import React, { useEffect, useState } from "react";
import { BiShoppingBag, BiMenu, BiX, BiUser } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";
import { useCartStore } from "../../Store/cartStore";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const items = useCartStore((state) => state.items);

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
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${scrolled ? "" : "border-b border-b-gray-200 bg-white"}`}
    >
      <div
        className={`mx-auto flex max-w-7xl bg-white items-center justify-between px-4 py-4 transition-all duration-400 ${scrolled ? " shadow rounded-2xl backdrop-blur-xl  border-white/10 py-3 my-2" : "bg-transparent py-5"}`}
      >
        <div className="flex items-center gap-20">
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
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-4 sm:flex ">
          <input
            type="text"
            placeholder="جستجو"
            className="hidden rounded-full w-60 bg-gray-200 transition-all duration-300 focus:w-90 hover:w-90 px-4 py-2 outline-blue-300  md:block"
          />

          <Link
            to="/cart"
            className="text-xl relative text-gray-700 hover:text-blue-600"
          >
            <BiShoppingBag  />
            <span className="absolute -top-4 -left-2 text-sm bg-blue-400 rounded-full text-white px-1">{items.length}</span>
          </Link>

          <Link to="/auth" className="text-gray-700 hover:text-blue-600">
            <BiUser className="text-3xl bg-gray-300 rounded-full p-1 hover:text-white " />
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
