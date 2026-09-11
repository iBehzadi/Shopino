import React from "react";
import {
  FiUser,
  FiMail,
  FiPackage,
  FiLogOut,
  FiChevronLeft,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../Store/authStore";

export default function Profile() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  return (
    <div className="mt-30 mb-20 px-4 sm:px-8 lg:px-12" dir="rtl">
      {/* header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          پروفایل من
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          اطلاعات حساب کاربری و سفارش‌های خودت رو مدیریت کن
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/*  user  */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 lg:col-span-2">
          {/* profile  */}
          <div className="flex items-center gap-4 border-b border-gray-100 pb-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600">
              <FiUser size={30} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                {user?.fullName || user?.username || "کاربر"}
              </h2>
              <p className="mt-1 text-sm text-gray-500">حساب کاربری Shopino</p>
            </div>
          </div>

          {/* Information */}
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between rounded-xl bg-gray-50 p-4">
              <div className="flex items-center gap-3">
                <FiUser className="text-gray-500" />
                <span className="text-sm text-gray-500">
                  نام و نام خانوادگی
                </span>
              </div>
              <span className="font-medium text-gray-800">
                {user?.fullName || "-"}
              </span>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-gray-50 p-4">
              <div className="flex items-center gap-3">
                <FiUser className="text-gray-500" />
                <span className="text-sm text-gray-500">نام کاربری</span>
              </div>
              <span className="font-medium text-gray-800">
                {user?.username || "-"}
              </span>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-gray-50 p-4">
              <div className="flex items-center gap-3">
                <FiMail className="text-gray-500" />
                <span className="text-sm text-gray-500">ایمیل</span>
              </div>
              <span className="max-w-[60%] truncate font-medium text-gray-800">
                {user?.email || "-"}
              </span>
            </div>

            <div className="flex items-center justify-between rounded-xl bg-gray-50 p-4">
              <div className="flex items-center gap-3">
                <FiUser className="text-gray-500" />
                <span className="text-sm text-gray-500">وضعیت حساب</span>
              </div>
              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-600">
                فعال
              </span>
            </div>
          </div>
        </div>

        {/*  actions  */}
        <div className="space-y-4">
          {/* orders */}
          <button className="flex w-full items-center justify-between rounded-2xl border border-gray-200 bg-white p-5 text-right transition hover:border-blue-200 hover:shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <FiPackage size={22} />
              </div>
              <div>
                <h3 className="font-bold text-gray-800">سفارش‌های من</h3>
                <p className="mt-1 text-xs text-gray-500">
                  مشاهده سفارش‌های ثبت‌شده
                </p>
              </div>
            </div>
            <FiChevronLeft className="text-gray-400" />
          </button>

          {/* Logout */}
          <button
            onClick={() => logout()}
            className="flex w-full items-center gap-4 rounded-2xl border border-red-100 bg-red-50 p-5 text-right text-red-600 transition hover:bg-red-100"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white">
              <FiLogOut size={21} />
            </div>
            <div>
              <h3 className="font-bold">خروج از حساب</h3>
              <p className="mt-1 text-xs text-red-400">خروج از حساب کاربری</p>
            </div>
          </button>
        </div>
      </div>

      {/*  orders preview  */}
      <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6">
        <div className="flex items-center justify-between border-b border-gray-100 pb-5">
          <div>
            <h2 className="text-xl font-bold text-gray-900">آخرین سفارش‌ها</h2>
            <p className="mt-1 text-sm text-gray-500">
              سفارش‌های اخیرت اینجا نمایش داده میشن
            </p>
          </div>
          <button className="hidden items-center gap-1 text-sm font-medium text-blue-600 sm:flex">
            مشاهده همه
            <FiChevronLeft />
          </button>
        </div>

        {/* empty order */}
        <div className="flex flex-col items-center justify-center py-14 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-gray-400">
            <FiPackage size={28} />
          </div>
          <h3 className="mt-4 font-bold text-gray-700">
            هنوز سفارشی ثبت نکردی
          </h3>
          <p className="mt-2 text-sm text-gray-400">
            بعد از ثبت سفارش، اطلاعات سفارش‌هات اینجا نمایش داده میشه.
          </p>
          <button
            onClick={() => navigate("/products")}
            className="mt-5 rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            مشاهده محصولات
          </button>
        </div>
      </div>
    </div>
  );
}
