import React, { useEffect, useState } from "react";
import fetchData from "../../../Utils/fetchData";
import { useNavigate } from "react-router-dom";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      const data = await fetchData("categories?populate=*");
      setCategories(data.data);
    })();
  }, []);

  return (
    <section className="mx-auto mt-24 max-w-7xl px-4">
      <div className="mb-10 text-right">
        <h2 className="text-3xl font-bold text-gray-800">دسته‌بندی محصولات</h2>

        <p className="mt-2 text-gray-500">
          محصولات موردنظرت رو از بین دسته‌بندی‌ها پیدا کن
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => navigate(`/products?category=${cat.slug}`)}
            className="group cursor-pointer overflow-hidden rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-2 "
          >
            <div className="flex h-30 items-center justify-center overflow-hidden rounded-xl bg-gray-50">
              <img
                src={import.meta.env.VITE_BASE_FILE + cat.image.url}
                className="h-full w-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                alt={cat.name}
              />
            </div>

            <h3 className="mt-5 text-center text-lg md:text-sm font-bold text-gray-800 transition-colors duration-300 group-hover:text-blue-600">
              {cat.name}
            </h3>

            <div className="mx-auto mt-3 h-1 w-0 rounded-full bg-blue-600 transition-all duration-300 group-hover:w-12" />
          </div>
        ))}
      </div>
    </section>
  );
}
