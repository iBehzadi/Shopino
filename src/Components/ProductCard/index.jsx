import React, { useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { IoBagOutline, IoBag } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../../Store/cartStore";

export default function ProductCard({ product }) {

  const [isLiked, setIsLiked] = useState(false);
  const {
    documentId,
    title,
    price,
    images,
    discountPrice = 0,
    stock = 0,
  } = product;
  const navigate = useNavigate();
  const handleLike = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };


  const discountPercent =
    discountPrice > 0 ? Math.round(((price - discountPrice) / price) * 100) : 0;

  return (
    <div
      onClick={() =>
        navigate(`/product-details/${documentId}/${title.replaceAll(" ", "-")}`)
      }
      className="group relative py-1 cursor-pointer bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden  w-84 sm:w-70 md:w-58 mx-auto"
    >
      {/*  image   */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={import.meta.env.VITE_BASE_FILE + images[0]?.url}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* off tag  */}
        {discountPrice > 0 && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-[12px] font-bold px-2 py-0.5 rounded-full shadow-lg">
            {discountPercent}٪
          </span>
        )}

        {/*  like btn */}
        <button
          onClick={handleLike}
          className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm p-1 rounded-full shadow-md hover:bg-white transition-all duration-200"
        >
          {isLiked ? (
            <FaHeart className="text-red-500 text-base" />
          ) : (
            <CiHeart className="text-gray-700 text-base hover:text-red-500 transition-colors" />
          )}
        </button>
      </div>

      {/* content  */}
      <div className="p-4 space-y-1">
        <h3 className="text-gray-800 font-semibold text-sm line-clamp-2 leading-tight">
          {title}
        </h3>

        <div className="flex items-baseline gap-1 flex-wrap">
          {discountPrice > 0 ? (
            <>
              <span className="text-sm font-bold text-red-600">
                {discountPrice.toLocaleString()}
              </span>
              <span className="text-[9px] text-gray-400 line-through">
                {price.toLocaleString()}
              </span>
            </>
          ) : (
            <span className="text-sm font-bold text-gray-800">
              {price.toLocaleString()}
            </span>
          )}
          <span className="text-[9px] text-gray-500">تومان</span>
        </div>

        <div className="flex items-center justify-between text-[14px]">
          <span
            className={`font-medium ${
              stock > 0 ? "text-green-600" : "text-red-500"
            }`}
          >
            {stock > 0 && stock < 5 ? (
              <span className="text-orange-500 font-medium">
                فقط {stock} عدد
              </span>
            ) : stock > 0 ? (
              `موجود (${stock})`
            ) : (
              "ناموجود"
            )}
          </span>
        </div>

        {/*  افزودن به سبد خرید */}
        {/* {cartItems.find((item) => item.documentId === product?.documentId) ? (
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeFromCart(product.documentId);
                }}
                className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100"
              >
                حذف
              </button>

              <div className="flex items-center gap-3 rounded-lg border border-gray-200 p-1">
                <button
                  className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-100 text-lg font-bold transition hover:bg-gray-200"
                  onClick={(e) => {
                    e.stopPropagation();
                    increaseQuantity(product.documentId);
                  }}
                >
                  +
                </button>

                <span className="min-w-6 text-center font-semibold">
                  {
                    cartItems.find(
                      (item) => item.documentId === product.documentId,
                    )?.cartQuantity
                  }
                </span>

                <button
                  className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-100 text-lg font-bold transition hover:bg-gray-200"
                  onClick={(e) => {
                    e.stopPropagation();
                    decreaseQuantity(product.documentId);
                  }}
                >
                  −
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product);
              }}
              className="cursor-pointer bg-blue-600 w-full hover:bg-blue-500 text-white px-4 py-2 rounded-full"
            >
              افزودن به سبد خرید
            </button>
          )} */}
        <button className="cursor-pointer bg-blue-600 w-full hover:bg-blue-500 text-white px-4 py-2 rounded-full">
          مشاهده محصول
        </button>
      </div>
    </div>
  );
}
