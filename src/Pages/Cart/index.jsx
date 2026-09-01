import React from "react";
import { useCartStore } from "../../Store/cartStore";

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
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-xl font-semibold text-gray-500">
          سبد خرید شما خالی است
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="mb-8 text-2xl font-bold">سبد خرید</h1>

      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full min-w-225 border-collapse text-center">
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
                item.discountPrice > 0 ? item.discountPrice : item.price;

              return (
                <tr key={item.documentId} className="border-t border-gray-200">
                  <td className="p-4">{index + 1}</td>

                  <td className="p-4 font-medium">{item.title}</td>

                  <td className="p-4">
                    <img
                      className="mx-auto h-20 w-20 rounded-lg object-cover"
                      src={import.meta.env.VITE_BASE_FILE + item.images[0].url}
                      alt={item.title}
                    />
                  </td>

                  <td className="p-4">{formatPrice(item.price)} تومان</td>

                  <td className="p-4">
                    {item.discountPrice > 0
                      ? `${formatPrice(item.discountPrice)} تومان`
                      : "-"}
                  </td>

                  <td className="p-4">
                    <div className="flex items-center justify-center gap-3">
                      <button
                        onClick={() => increaseQuantity(item.documentId)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 font-bold hover:bg-gray-200"
                      >
                        +
                      </button>

                      <span className="min-w-6 font-semibold">
                        {item.cartQuantity}
                      </span>

                      <button
                        onClick={() => decreaseQuantity(item.documentId)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 font-bold hover:bg-gray-200"
                      >
                        −
                      </button>
                    </div>
                  </td>

                  <td className="p-4 font-semibold">
                    {formatPrice(finalPrice * item.cartQuantity)} تومان
                  </td>

                  <td className="p-4">
                    <button
                      onClick={() => removeFromCart(item.documentId)}
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
                <button
                  onClick={clearCart}
                  className="rounded-lg bg-red-600 px-4 py-2 font-semibold text-white transition hover:bg-red-700"
                >
                  حذف همه
                </button>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
