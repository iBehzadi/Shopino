import React, { useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { IoBagOutline, IoBag } from "react-icons/io5";

export default function ProductCard({
  id,
  name,
  price,
  images,
  discountPrice = 0,
  stock = 0,
  
}) {
  const [isLiked, setIsLiked] = useState(false);
  const [isInCart, setIsInCart] = useState(false);

  const handleLike = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    setIsInCart(!isInCart);
  };

  const discountPercent =
    discountPrice > 0 ? Math.round(((price - discountPrice) / price) * 100) : 0;

  return (
    <div className="group relative py-1 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden w-72 mx-auto">
      {/*  تصویر   */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={import.meta.env.VITE_BASE_FILE + images[0]?.url}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* برچسب تخفیف */}
        {discountPrice > 0 && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-[12px] font-bold px-2 py-0.5 rounded-full shadow-lg">
            {discountPercent}٪
          </span>
        )}

        {/* دکمه لایک */}
        <button
          onClick={handleLike}
          className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm p-1 rounded-full shadow-md hover:bg-white transition-all duration-200"
          aria-label="افزودن به علاقه‌مندی‌ها"
        >
          {isLiked ? (
            <FaHeart className="text-red-500 text-base" />
          ) : (
            <CiHeart className="text-gray-700 text-base hover:text-red-500 transition-colors" />
          )}
        </button>
      </div>

      {/* محتوای کارت   */}
      <div className="p-2 space-y-1">
        {/* نام محصول */}
        <h3 className="text-gray-800 font-semibold text-sm line-clamp-2 leading-tight">
          {name}
        </h3>

        {/* قیمت‌*/}
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

        {/* موجودی */}
        <div className="flex items-center justify-between text-[14px]">
          <span
            className={`font-medium ${
              stock > 0 ? "text-green-600" : "text-red-500"
            }`}
          >
            {stock > 0 ? `موجود (${stock})` : "ناموجود"}
          </span>
          {stock > 0 && stock < 5 && (
            <span className="text-orange-500 font-medium">
              فقط {stock} عدد
            </span>
          )}
        </div>

        {/*  افزودن به سبد خرید */}
        <button
          onClick={handleAddToCart}
          disabled={stock === 0}
          className={`w-full flex items-center justify-center gap-1 py-1 px-2 rounded-lg text-[16px] font-medium transition-all duration-300 ${
            stock === 0
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : isInCart
              ? "bg-emerald-600 text-white hover:bg-emerald-700"
              : "bg-blue-600 text-white hover:bg-blue-700 active:scale-95"
          }`}
        >
          {isInCart ? (
            <>
              <IoBag className="text-sm" />
              <span>افزوده شد</span>
            </>
          ) : (
            <>
              <IoBagOutline className="text-sm" />
              <span>افزودن</span>
            </>
          )}
        </button>

        
      </div>
    </div>
  );
}