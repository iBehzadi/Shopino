import React, { useEffect, useState } from "react";
import { BiShoppingBag, BiMenu, BiX, BiUser } from "react-icons/bi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCartStore } from "../../Store/cartStore";
import { useAuthStore } from "../../Store/authStore";
import { ImEnter, ImExit } from "react-icons/im";
import { CiHome } from "react-icons/ci";
import { RiShoppingBag3Line } from "react-icons/ri";
import { MdOutlineContactPhone } from "react-icons/md";
import { FaChild } from "react-icons/fa";
import { SlBasketLoaded } from "react-icons/sl";
import fetchData from "../../Utils/fetchData";
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const items = useCartStore((state) => state.items);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!search.trim()) {
      setProducts([]);
      return;
    }
    setLoading(true);
    const sTime = setInterval(async () => {
      const data = await fetchData(
        `products?filters[title][$containsi]=${encodeURIComponent(search)}&populate=*`,
      );
      setProducts(data.data);
      setLoading(false);
      clearInterval(sTime);
    }, 500);

    return () => clearInterval(sTime);
  }, [search]);

  const navLinks = [
    { name: "خانه", path: "/", icon: CiHome },
    { name: "محصولات", path: "/products", icon: RiShoppingBag3Line },
    { name: "درباره ما", path: "/about", icon: MdOutlineContactPhone },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${scrolled ? "" : "border-b border-b-gray-200 bg-white"}`}
    >
      <div
        className={`mx-auto flex max-w-7xl bg-white items-center justify-between px-4 py-4 transition-all duration-400 ${scrolled ? " shadow rounded-2xl backdrop-blur-xl  border-white/10 py-3 my-2" : "bg-transparent py-5"}`}
      >
        <div className="flex items-center gap-20">
          {/* logo */}
          <Link to="/" className="text-2xl font-bold text-blue-600">
            شاپینو
          </Link>

          {/* desktop Menu */}
          <div className="hidden items-center gap-6 sm:flex ">
            {navLinks.map((link) => {
              const Icon = link.icon;

              return (
                <Link
                  to={link.path}
                  key={link.name}
                  className="group relative text-gray-700 hover:text-blue-600 flex items-center justify-center gap-1"
                >
                  <Icon />
                  {link.name}

                  <span
                    className={`absolute left-0 -bottom-1 h-0.5 bg-orange-500 transition-all duration-300 ${
                      location.pathname === link.path
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
          </div>
        </div>

        {/* desktop Actions */}
        <div className="hidden  items-center gap-4 sm:flex ">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="جستجو"
            className="hidden rounded-full w-50 bg-gray-200 transition-all duration-300  px-4 py-2 outline-blue-300 lg:block"
          />
          {search.trim() && (
            <div className="absolute top-20 left-30 z-50 w-80 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl">
              {loading ? (
                <div className="p-5 text-center text-sm text-gray-500">
                  در حال جستجو...
                </div>
              ) : products.length > 0 ? (
                // show result
                <>
                  <div className="max-h-100 overflow-y-auto p-2">
                    {products.map((product) => {
                      const price =
                        product.discountPrice > 0
                          ? product.discountPrice
                          : product.price;

                      return (
                        <div
                          key={product.documentId}
                          onClick={() => {
                            navigate(
                              `/product-details/${product.documentId}/${product.title}`,
                            );
                            setSearch("");
                          }}
                          className="flex cursor-pointer items-center gap-3 rounded-lg p-2 transition hover:bg-gray-50"
                        >
                          <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-gray-100 bg-white">
                            <img
                              src={
                                import.meta.env.VITE_BASE_FILE +
                                product.images?.[0]?.url
                              }
                              alt={product.title}
                              className="h-full w-full object-contain p-1"
                            />
                          </div>

                          <div className="min-w-0 flex-1">
                            <h3 className="truncate text-sm font-medium text-gray-800">
                              {product.title}
                            </h3>

                            <p className="mt-1 text-xs text-gray-500">
                              {new Intl.NumberFormat("fa-IR").format(price)}{" "}
                              تومان
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              ) : (
                <div className="p-6 text-center">
                  <p className="text-sm text-gray-500">محصولی یافت نشد 😕</p>
                  <p className="mt-1 text-xs text-gray-400">
                    عبارت دیگری را امتحان کن
                  </p>
                </div>
              )}
            </div>
          )}

          <Link
            to="/cart"
            className="text-xl relative text-gray-700 hover:text-blue-600"
          >
            <BiShoppingBag />
            <span className="absolute -top-4 -left-2 text-sm bg-blue-400 rounded-full text-white px-1">
              {items.length}
            </span>
          </Link>

          <div className="profile">
            {user ? (
              <div className="group relative flex items-center gap-2">
                <Link
                  to="/profile"
                  className="text-gray-700 hover:text-blue-600"
                >
                  <BiUser className="text-3xl bg-gray-300 rounded-full p-1 hover:text-white " />
                </Link>
                <div className="absolute bg-white shadow border border-gray-200 p-2 flex flex-col gap-2 items-center rounded top-10 -left-5 w-30 h-0 opacity-0 invisible group-hover:opacity-100 group-hover:h-auto group-hover:visible transition-all duration-300">
                  <span className="text-sm text-gray-600 flex items-center gap-1 flex-1">
                    <FaChild />
                    سلام {user.username}
                  </span>
                  <Link
                    to="/cart"
                    className="text-sm flex items-center justify-center py-2 gap-1 cursor-pointer text-white bg-blue-400 w-full rounded hover:scale-105 transition-all duration-300"
                  >
                    <SlBasketLoaded />
                    سبد خرید
                  </Link>
                  <button
                    className="cursor-pointer text-white bg-red-400 w-full rounded hover:scale-105 transition-all duration-300"
                    onClick={() => {
                      logout();
                      navigate("/");
                    }}
                  >
                    خروج
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/auth"
                className="group text-sm border text-gray-600 border-gray-300 hover:border-gray-400 rounded p-2 flex items-center gap-2"
              >
                <ImEnter className="text-xl group-hover:text-green-600" />
                <span> ورود / ثبت نام</span>
              </Link>
            )}
          </div>
        </div>

        {/* mobile Menu button */}
        <button
          onClick={() => setIsOpen(true)}
          className="text-3xl text-gray-700 sm:hidden"
        >
          <BiMenu />
        </button>
      </div>

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/40 sm:hidden"
        />
      )}

      {/* mobile sidebar */}
      <div
        className={`fixed right-0 top-0 h-full w-72 bg-white p-6 shadow-xl transition-transform duration-300 sm:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* close */}
        <div className="mb-8 flex items-center justify-between">
          <span className="text-xl font-bold text-blue-600">شاپینو</span>
          <button
            onClick={() => setIsOpen(false)}
            className="text-3xl text-gray-700"
          >
            <BiX />
          </button>
        </div>

        {/* mobile links */}
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

          <div>
            {user ? (
              <div className="flex flex-col items-start gap-2">
                <span className="text-gray-700">سلام {user.username}</span>
                <button
                  className="cursor-pointer text-red-400 flex items-center gap-2"
                  onClick={() => {
                    logout();
                    navigate("/");
                    setIsOpen(false);
                  }}
                >
                  <ImExit />
                  <span> خروج از حساب </span>
                </button>
              </div>
            ) : (
              <Link
                to="/auth"
                className="p-2 flex items-center gap-2"
                onClick={() => setIsOpen(false)}
              >
                <ImEnter className=" text-gray-700" />
                <span className="text-sm"> ورود / ثبت نام</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
