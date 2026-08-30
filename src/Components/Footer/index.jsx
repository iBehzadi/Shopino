import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaTelegramPlane, FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="mt-20 bg-gray-900 text-gray-300">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-12 sm:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div>
          <h2 className="mb-4 text-2xl font-bold text-white">Shopino</h2>
          <p className="text-sm leading-7 text-gray-400">
            خریدی ساده، سریع و مطمئن با شاپینو
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="mb-4 font-semibold text-white">دسترسی سریع</h3>
          <ul className="space-y-3 text-sm">
            <li>
              <Link to="/" className="transition hover:text-white">
                صفحه اصلی
              </Link>
            </li>
            <li>
              <Link to="/products" className="transition hover:text-white">
                محصولات
              </Link>
            </li>
            <li>
              <Link to="/cart" className="transition hover:text-white">
                سبد خرید
              </Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="mb-4 font-semibold text-white">پشتیبانی</h3>
          <ul className="space-y-3 text-sm text-gray-400">
            <li>سوالات متداول</li>
            <li>قوانین و مقررات</li>
            <li>تماس با ما</li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="mb-4 font-semibold text-white">ما را دنبال کنید</h3>
          <div className="flex gap-3">
            <a
              href="#"
              className="rounded-lg bg-gray-800 p-3 transition hover:bg-gray-700"
            >
              <FaInstagram />
            </a>

            <a
              href="#"
              className="rounded-lg bg-gray-800 p-3 transition hover:bg-gray-700"
            >
              <FaTelegramPlane />
            </a>

            <a
              href="#"
              className="rounded-lg bg-gray-800 p-3 transition hover:bg-gray-700"
            >
              <FaGithub />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 py-5 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Shopino — تمامی حقوق محفوظ است.
      </div>
    </footer>
  );
}
