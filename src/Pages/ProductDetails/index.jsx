import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import fetchData from "../../Utils/fetchData";
import { useCartStore } from "../../Store/cartStore";
import {
  FiShoppingCart,
  FiTrash2,
  FiPlus,
  FiMinus,
  FiChevronLeft,
  FiPackage,
} from "react-icons/fi";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const addToCart = useCartStore((state) => state.addToCart);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const cartItems = useCartStore((state) => state.items);

  useEffect(() => {
    (async () => {
      const data = await fetchData(`products/${id}?populate=*`);
      setProduct(data.data);
    })();
  }, [id]);

  const currentImage = product?.images?.[currentImageIndex]?.url;

  const productQuantity = cartItems.find(
    (item) => item.documentId === product?.documentId,
  )?.cartQuantity;

  const hasDiscount =
    product?.discountPrice && product.discountPrice < product.price;

  const discountPercent = hasDiscount
    ? Math.round(
        ((product.price - product.discountPrice) / product.price) * 100,
      )
    : 0;

  const formatPrice = (price) => new Intl.NumberFormat("fa-IR").format(price);

  if (!product) {
    return (
      <div className="mt-30 flex min-h-100 items-center justify-center">
        <span className="text-gray-500">در حال بارگذاری محصول...</span>
      </div>
    );
  }

  return (
    <div className="mt-30 mb-20 px-4 sm:px-8 lg:px-12" dir="rtl">
      <div className="mb-8 flex items-center gap-2 text-sm text-gray-500">
        <span>فروشگاه</span>

        <FiChevronLeft className="text-gray-400" />

        <span>{product.categories?.[0]?.name}</span>

        <FiChevronLeft className="text-gray-400" />

        <span className="font-medium text-gray-700">{product.title}</span>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        {/*  image  */}
        <div className="flex flex-col-reverse gap-4 sm:flex-row">
          {/* mini images */}
          <div className="flex gap-3 sm:w-24 sm:flex-col">
            {product.images?.map((img, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`
                  overflow-hidden rounded-xl border bg-white p-2 transition
                  ${
                    currentImageIndex === index
                      ? "border-blue-600 ring-2 ring-blue-100"
                      : "border-gray-200 hover:border-gray-400"
                  }
                `}
              >
                <img
                  src={import.meta.env.VITE_BASE_FILE + img.url}
                  alt={product.title}
                  className="aspect-square w-full object-contain"
                />
              </button>
            ))}
          </div>

          {/* main mage */}
          <div className="flex-1">
            <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl border border-gray-200 bg-white p-6">
              {hasDiscount && (
                <span className="absolute right-4 top-4 z-10 rounded-full bg-red-500 px-3 py-1.5 text-sm font-bold text-white">
                  {discountPercent}% تخفیف
                </span>
              )}

              <img
                src={import.meta.env.VITE_BASE_FILE + currentImage}
                alt={product.title}
                className="h-full w-full object-contain transition duration-300 hover:scale-105"
              />
            </div>
          </div>
        </div>

        {/*  product info  */}
        <div className="flex flex-col">
          {/* title */}
          <h1 className="text-2xl font-bold leading-10 text-gray-900 sm:text-3xl">
            {product.title}
          </h1>

          {/* category */}
          <div className="mt-3">
            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">
              {product.categories?.[0]?.name}
            </span>
          </div>

          {/* description */}
          <p className="mt-6 max-w-2xl text-justify text-sm leading-7 text-gray-600 sm:text-base line-clamp-8">
            {product.description}
          </p>

          <div className="my-6 h-px bg-gray-200" />

          {/* stock */}
          <div className="flex items-center gap-2 text-sm">
            <FiPackage className="text-gray-500" />

            {product.stock > 0 ? (
              <span className="text-green-600">
                {product.stock} عدد در انبار موجود است
              </span>
            ) : (
              <span className="text-red-500">محصول ناموجود است</span>
            )}
          </div>

          {/* price */}
          <div className="mt-6">
            {hasDiscount && (
              <div className="mb-1 text-sm text-gray-400 line-through">
                {formatPrice(product.price)} تومان
              </div>
            )}

            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold text-gray-900 sm:text-3xl">
                {formatPrice(
                  hasDiscount ? product.discountPrice : product.price,
                )}
              </span>

              <span className="text-sm text-gray-500">تومان</span>
            </div>
          </div>

          {/* actions */}
          <div className="mt-8">
            {cartItems.find(
              (item) => item.documentId === product.documentId,
            ) ? (
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                {/* quantity */}
                <div className="flex h-12 items-center justify-between rounded-xl border border-gray-200 bg-gray-50 px-2 sm:w-40">
                  <button
                    disabled={productQuantity >= product.stock}
                    onClick={() => increaseQuantity(product.documentId)}
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-lg shadow-sm transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <FiPlus />
                  </button>

                  <span className="font-bold text-gray-800">
                    {productQuantity}
                  </span>

                  <button
                    onClick={() => decreaseQuantity(product.documentId)}
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-lg shadow-sm transition hover:bg-gray-100"
                  >
                    <FiMinus />
                  </button>
                </div>

                {/* remove */}
                <button
                  onClick={() => removeFromCart(product.documentId)}
                  className="flex h-12 items-center justify-center gap-2 rounded-xl bg-red-50 px-5 text-sm font-medium text-red-600 transition hover:bg-red-100"
                >
                  <FiTrash2 />
                  حذف از سبد
                </button>
              </div>
            ) : product.stock > 0 ? (
              <button
                onClick={() => addToCart(product)}
                className="flex h-13 w-full items-center justify-center gap-3 rounded-xl bg-blue-600 px-5 font-medium text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 active:scale-[0.98]"
              >
                <FiShoppingCart className="text-xl" />
                افزودن به سبد خرید
              </button>
            ) : (
              <div className="flex h-13 w-full items-center justify-center rounded-xl bg-red-50 font-medium text-red-500">
                محصول ناموجود
              </div>
            )}

            {/* max Stock */}
            {productQuantity >= product.stock && product.stock > 0 && (
              <p className="mt-3 text-xs text-red-500">
                حداکثر تعداد قابل خرید از این محصول {product.stock} عدد است.
              </p>
            )}
          </div>
        </div>
      </div>

      {/*  description  */}
      <div className="mt-16 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
        <h2 className="mb-5 border-b border-gray-100 pb-4 text-xl font-bold text-gray-900">
          معرفی محصول
        </h2>

        <p className="text-justify text-sm leading-8 text-gray-600 sm:text-base">
          {product.description}
        </p>
      </div>
    </div>
  );
}
