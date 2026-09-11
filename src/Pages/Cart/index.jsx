import React from "react";
import { useCartStore } from "../../Store/cartStore";
import { Link } from "react-router-dom";

export default function Cart() {
  const cartItems = useCartStore((state) => state.items);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const clearCart = useCartStore((state) => state.clearCart);

  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.cartQuantity,
    0,
  );

  const totalPrice = cartItems.reduce(
    (total, item) =>
      total +
      (item.discountPrice > 0 ? item.discountPrice : item.price) *
        item.cartQuantity,
    0,
  );

  const formatPrice = (price) => price.toLocaleString("fa-IR");

  if (cartItems.length === 0) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center px-4">
        <p className="text-xl font-semibold text-gray-500">
          سبد خرید شما خالی است
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:py-10">
      <h1 className="mb-6 text-xl font-bold sm:mb-8 sm:text-2xl">
        سبد خرید
      </h1>

      {/* ================= DESKTOP ================= */}
      <div className="hidden overflow-x-auto rounded-xl border border-gray-200 md:block">
        <table className="w-full border-collapse text-center">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4">#</th>
              <th className="p-4">نام محصول</th>
              <th className="p-4">تصویر</th>
              <th className="p-4">قیمت</th>
              <th className="p-4">قیمت با تخفیف</th>
              <th className="p-4">تعداد</th>
              <th className="p-4">قیمت نهایی</th>
              <th className="p-4">عملیات</th>
            </tr>
          </thead>

          <tbody>
            {cartItems.map((item, index) => {
              const finalPrice =
                item.discountPrice > 0
                  ? item.discountPrice
                  : item.price;

              return (
                <tr
                  key={item.documentId}
                  className="border-t border-gray-200"
                >
                  <td className="p-4">{index + 1}</td>

                  <td className="p-4 font-medium">
                    {item.title}
                  </td>

                  <td className="p-4">
                    <img
                      className="mx-auto h-20 w-20 rounded-lg object-cover"
                      src={
                        import.meta.env.VITE_BASE_FILE +
                        item.images[0].url
                      }
                      alt={item.title}
                    />
                  </td>

                  <td className="p-4">
                    {formatPrice(item.price)} تومان
                  </td>

                  <td className="p-4">
                    {item.discountPrice > 0
                      ? `${formatPrice(item.discountPrice)} تومان`
                      : "-"}
                  </td>

                  <td className="p-4">
                    <div className="flex items-center justify-center gap-3">
                      <button
                        onClick={() =>
                          increaseQuantity(item.documentId)
                        }
                        className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 font-bold hover:bg-gray-200"
                      >
                        +
                      </button>

                      <span className="min-w-6 font-semibold">
                        {item.cartQuantity}
                      </span>

                      <button
                        onClick={() =>
                          decreaseQuantity(item.documentId)
                        }
                        className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 font-bold hover:bg-gray-200"
                      >
                        −
                      </button>
                    </div>
                  </td>

                  <td className="p-4 font-semibold">
                    {formatPrice(
                      finalPrice * item.cartQuantity,
                    )}{" "}
                    تومان
                  </td>

                  <td className="p-4">
                    <button
                      onClick={() =>
                        removeFromCart(item.documentId)
                      }
                      className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-100"
                    >
                      حذف
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>

          <tfoot className="border-t-2 border-gray-300 bg-gray-50">
            <tr>
              <td colSpan="2" className="p-4 font-semibold">
                تعداد محصولات: {cartItems.length}
              </td>

              <td colSpan="2" className="p-4 font-semibold">
                تعداد کل: {totalQuantity}
              </td>

              <td colSpan="2" className="p-4 text-lg font-bold">
                مبلغ نهایی: {formatPrice(totalPrice)} تومان
              </td>

              <td colSpan="2" className="p-4">
                <div className="flex justify-center gap-2">
                  <button
                    onClick={clearCart}
                    className="rounded-lg bg-red-600 px-4 py-2 font-semibold text-white transition hover:bg-red-700"
                  >
                    حذف همه
                  </button>

                  <Link
                    className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700"
                    to="/checkout"
                  >
                    ادامه فرایند خرید
                  </Link>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/*  mobile  */}
      <div className="space-y-4 md:hidden">
        {cartItems.map((item) => {
          const finalPrice =
            item.discountPrice > 0
              ? item.discountPrice
              : item.price;

          return (
            <div
              key={item.documentId}
              className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
            >
              {/* Product */}
              <div className="flex gap-3">
                <img
                  className="h-20 w-20 shrink-0 rounded-xl object-cover"
                  src={
                    import.meta.env.VITE_BASE_FILE +
                    item.images[0].url
                  }
                  alt={item.title}
                />

                <div className="min-w-0 flex-1">
                  <h2 className="line-clamp-2 text-sm font-semibold">
                    {item.title}
                  </h2>

                  <div className="mt-2 text-sm text-gray-500">
                    قیمت:
                    <span className="mr-1 font-semibold text-gray-800">
                      {formatPrice(finalPrice)} تومان
                    </span>
                  </div>
                </div>
              </div>

              {/* quantity */}
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  تعداد
                </span>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() =>
                      increaseQuantity(item.documentId)
                    }
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-lg font-bold"
                  >
                    +
                  </button>

                  <span className="min-w-6 text-center font-semibold">
                    {item.cartQuantity}
                  </span>

                  <button
                    onClick={() =>
                      decreaseQuantity(item.documentId)
                    }
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-lg font-bold"
                  >
                    −
                  </button>
                </div>
              </div>

              {/* final price */}
              <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
                <span className="text-sm text-gray-500">
                  مبلغ نهایی
                </span>

                <span className="font-bold">
                  {formatPrice(
                    finalPrice * item.cartQuantity,
                  )}{" "}
                  تومان
                </span>
              </div>

              {/* remove item */}
              <button
                onClick={() =>
                  removeFromCart(item.documentId)
                }
                className="mt-4 w-full rounded-lg bg-red-50 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-100"
              >
                حذف محصول
              </button>
            </div>
          );
        })}

        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
          <div className="flex justify-between text-sm">
            <span>تعداد محصولات</span>
            <span className="font-semibold">
              {cartItems.length}
            </span>
          </div>

          <div className="mt-2 flex justify-between text-sm">
            <span>تعداد کل</span>
            <span className="font-semibold">
              {totalQuantity}
            </span>
          </div>

          <div className="mt-4 border-t border-gray-200 pt-4">
            <div className="flex items-center justify-between">
              <span className="font-semibold">
                مبلغ نهایی
              </span>

              <span className="text-lg font-bold">
                {formatPrice(totalPrice)} تومان
              </span>
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <button
              onClick={clearCart}
              className="flex-1 rounded-lg bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700"
            >
              حذف همه
            </button>

            <Link
              to="/checkout"
              className="flex flex-1 items-center justify-center rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              ادامه خرید
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}