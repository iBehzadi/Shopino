import React from "react";
import { useCartStore } from "../../Store/cartStore";

export default function Checkout() {
  const cartItems = useCartStore((state) => state.items);

  const totalDiscount = cartItems.reduce((total, item) => {
    if (item.discountPrice > 0) {
      return total + (item.price - item.discountPrice) * item.cartQuantity;
    }
    return total;
  }, 0);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.cartQuantity,
    0,
  );

  const finalPrice = cartItems.reduce(
    (total, item) =>
      total +
      (item.discountPrice > 0 ? item.discountPrice : item.price) *
        item.cartQuantity,
    0,
  );

  const formatPrice = (price) => price.toLocaleString("fa-IR");

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50 px-4 py-10 pt-26">
      {/* Header */}
      <div className="mx-auto mb-8 max-w-7xl">
        <h1 className="text-2xl font-bold text-gray-900">تکمیل سفارش</h1>

        <div className="mt-2 flex items-center gap-3 text-sm text-gray-400">
          <span>سبد خرید</span>
          <span>←</span>
          <span className="font-medium text-blue-600">تکمیل سفارش</span>
        </div>
      </div>

      {/* Main */}
      <div className="mx-auto flex max-w-7xl flex-col gap-6 lg:flex-row lg:items-start">
        {/* Right - Form */}
        <div className="flex w-full flex-col gap-5 lg:w-2/3">
          {/* Receiver Info */}
          <form className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
            {/* Title */}
            <div className="mb-2 flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white">
                1
              </span>

              <h2 className="text-lg font-bold">اطلاعات گیرنده</h2>
            </div>

            <p className="mb-6 text-sm text-gray-500">
              لطفا اطلاعات خود را به درستی وارد کنید تا سفارش شما به موقع ارسال
              شود.
            </p>

            {/* Name + Phone */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm font-medium">
                نام و نام خانوادگی *
                <input
                  type="text"
                  placeholder="مثلا: بهزاد صادقی"
                  className="h-11 rounded-xl border border-gray-300 px-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </label>

              <label className="flex flex-col gap-2 text-sm font-medium">
                شماره موبایل *
                <input
                  type="text"
                  placeholder="مثلا: 09331234567"
                  className="h-11 rounded-xl border border-gray-300 px-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </label>
            </div>

            {/* Address */}
            <label className="mt-5 flex flex-col gap-2 text-sm font-medium">
              آدرس کامل *
              <textarea
                rows="4"
                placeholder="استان، شهر، خیابان، پلاک، واحد و کد پستی"
                className="resize-none rounded-xl border border-gray-300 p-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </label>

            {/* Postal + Description */}
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm font-medium">
                کد پستی
                <input
                  type="text"
                  placeholder="مثلا: 9185715487"
                  className="h-11 rounded-xl border border-gray-300 px-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </label>

              <label className="flex flex-col gap-2 text-sm font-medium">
                توضیحات
                <input
                  type="text"
                  placeholder="مثلا: قبل از ارسال تماس بگیرید"
                  className="h-11 rounded-xl border border-gray-300 px-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </label>
            </div>
          </form>

          {/* Send Method */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white">
                2
              </span>

              <h2 className="text-lg font-bold">روش ارسال</h2>
            </div>

            <div className="flex cursor-pointer items-center justify-between rounded-xl border-2 border-blue-500 bg-blue-50 p-4">
              <div>
                <h3 className="font-semibold">ارسال با پست پیشتاز</h3>

                <p className="mt-1 text-sm text-gray-500">
                  تحویل در ۲ تا ۴ روز کاری
                </p>
              </div>

              <span className="font-bold text-green-600">رایگان</span>
            </div>
          </div>

          {/* Pay Method */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white">
                3
              </span>

              <h2 className="text-lg font-bold">روش پرداخت</h2>
            </div>

            <div className="rounded-xl border-2 border-blue-500 bg-blue-50 p-4">
              <h3 className="font-semibold">پرداخت آنلاین</h3>

              <p className="mt-1 text-sm text-gray-500">
                پرداخت امن از طریق درگاه بانکی
              </p>
            </div>

            <button
              type="button"
              className="mt-5 w-full rounded-xl bg-blue-600 py-3.5 font-bold text-white transition hover:bg-blue-700"
            >
              ثبت سفارش و پرداخت
            </button>
          </div>
        </div>

        {/* Left - Order Summary */}
        <div className="w-full lg:sticky lg:top-28 lg:w-1/3">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="mb-5 text-xl font-bold">خلاصه سفارش</h2>

            {/* Product */}
            {cartItems.map((item) => (
              <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                <img
                  src={import.meta.env.VITE_BASE_FILE + item.images[0].url}
                  alt=""
                  className="h-16 w-16 rounded-xl object-cover"
                />

                <div className="flex-1">
                  <h3 className="line-clamp-2 text-sm font-semibold">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-xs text-gray-500">
                    تعداد: {item.cartQuantity}
                  </p>
                </div>

                <span className="text-sm font-semibold">
                  {item.discountPrice > 0
                    ? formatPrice(item.discountPrice)
                    : formatPrice(item.price)}
                </span>
              </div>
            ))}

            {/* Prices */}
            <div className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">جمع جزء</span>

                <span className="font-medium">
                  {formatPrice(totalPrice)} تومان
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">تخفیف</span>

                <span className="font-medium text-green-600">
                  {formatPrice(totalDiscount)} تومان
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">هزینه ارسال</span>

                <span className="font-medium text-green-600">رایگان</span>
              </div>
            </div>

            {/* Total */}
            <div className="mt-5 flex items-center justify-between border-t border-gray-200 pt-5">
              <span className="font-bold">مبلغ نهایی</span>

              <span className="text-xl font-bold text-gray-900">
                {formatPrice(finalPrice)} تومان
              </span>
            </div>

            <div className="mt-5 rounded-xl bg-gray-50 p-4 text-center text-xs text-gray-500">
              ارسال سفارش معمولاً بین ۲ تا ۴ روز کاری انجام می‌شود.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
