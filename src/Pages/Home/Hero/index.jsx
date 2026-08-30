import React from "react";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();
  return (
    <div className="relative h-screen overflow-hidden">
      <img
        src="../../../src/assets/w.jpg"
        className="h-full w-full object-cover object-center"
        alt="محصولات دیجیتال"
      />

      <div className="absolute inset-0 bg-black/30"></div>

      <div className="absolute right-8 top-1/2 max-w-xl -translate-y-1/2 text-right text-white md:right-20">
        <h1 className="mb-4 text-3xl font-bold md:text-5xl">
          خریدی متفاوت، تجربه‌ای متفاوت
        </h1>

        <h2 className="mb-6 text-base md:text-xl">
          بهترین محصولات با قیمت مناسب، همین‌جا منتظر شما
        </h2>

        <button
          onClick={() => navigate("/products")}
          className="rounded-full bg-white px-6 py-3 cursor-pointer font-semibold text-gray-800 transition hover:scale-105"
        >
          مشاهده محصولات
        </button>
      </div>
    </div>
  );
}
