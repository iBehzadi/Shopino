
import React from "react";
import { Link } from "react-router-dom";
import {
  FiShoppingBag,
  FiTruck,
  FiShield,
  FiHeadphones,
} from "react-icons/fi";

export default function About() {
  const features = [
    {
      icon: FiShoppingBag,
      title: "تنوع محصولات",
      description: "محصولات متنوع و کاربردی برای انتخاب راحت‌تر شما",
    },
    {
      icon: FiTruck,
      title: "ارسال سریع",
      description: "سفارش شما در سریع‌ترین زمان ممکن ارسال می‌شود",
    },
    {
      icon: FiShield,
      title: "خرید مطمئن",
      description: "تجربه‌ای امن و مطمئن برای خرید آنلاین",
    },
    {
      icon: FiHeadphones,
      title: "پشتیبانی",
      description: "همیشه برای پاسخگویی و کمک به شما آماده‌ایم",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50 pt-6">
      {/* Hero */}
      <section className="relative overflow-hidden bg-white">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:px-8">
          <div className="text-right">
            <span className="mb-4 inline-block rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600">
              درباره Shopino
            </span>

            <h1 className="mb-6 text-4xl font-extrabold leading-tight text-gray-900 md:text-5xl">
              خرید آنلاین،
              <br />
              <span className="text-blue-600">ساده‌تر از همیشه</span>
            </h1>

            <p className="mb-8 max-w-xl text-lg leading-8 text-gray-500">
              Shopino با هدف ساختن یک تجربه ساده، سریع و لذت‌بخش برای خرید
              آنلاین ساخته شده است. ما تلاش می‌کنیم محصولات کاربردی و باکیفیت
              را در اختیار شما قرار دهیم.
            </p>

            <Link
              to="/products"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
            >
              مشاهده محصولات
              <FiShoppingBag />
            </Link>
          </div>

          <div className="relative">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-blue-100 blur-3xl" />
            <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-purple-100 blur-3xl" />

            <div className="relative flex h-80 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 shadow-xl">
              <div className="text-center text-white">
                <FiShoppingBag className="mx-auto mb-5 text-7xl" />

                <h2 className="text-3xl font-bold">Shopino</h2>

                <p className="mt-2 text-blue-100">
                  خریدی راحت، سریع و مطمئن
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            چرا Shopino؟
          </h2>

          <p className="mt-3 text-gray-500">
            چیزهایی که تجربه خرید شما را بهتر می‌کنند
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-2xl bg-white p-6 text-right shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Icon className="text-2xl" />
                </div>

                <h3 className="mb-3 text-lg font-bold text-gray-900">
                  {feature.title}
                </h3>

                <p className="text-sm leading-7 text-gray-500">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Story */}
      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center">
          <span className="text-sm font-medium text-blue-600">
            داستان ما
          </span>

          <h2 className="mt-3 text-3xl font-bold text-gray-900">
            ساخته شده برای یک تجربه بهتر
          </h2>

          <p className="mt-6 text-base leading-8 text-gray-500">
            در Shopino باور داریم خرید آنلاین نباید پیچیده باشد. از پیدا کردن
            محصول موردنظر گرفته تا ثبت سفارش، همه‌چیز باید سریع و ساده باشد.
            هدف ما ساخت یک فروشگاه اینترنتی مدرن است که کاربر در آن احساس
            راحتی و اطمینان داشته باشد.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl rounded-3xl bg-blue-600 px-6 py-14 text-center text-white shadow-xl">
          <h2 className="text-3xl font-bold">
            آماده یک خرید خوب هستی؟
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-blue-100">
            محصولات موردنظرت رو پیدا کن و تجربه خرید ساده و سریع Shopino رو
            امتحان کن.
          </p>

          <Link
            to="/products"
            className="mt-8 inline-flex rounded-xl bg-white px-7 py-3 font-semibold text-blue-600 transition hover:bg-gray-100"
          >
            شروع خرید
          </Link>
        </div>
      </section>
    </main>
  );
}

