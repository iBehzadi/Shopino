import React, { useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

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
    discountPrice > 0
      ? Math.round(((price - discountPrice) / price) * 100)
      : 0;

  return (
    <div
      onClick={() =>
        navigate(
          `/product-details/${documentId}/${title.replaceAll(" ", "-")}`,
        )
      }
      className="group relative w-full h-full flex flex-col py-2 px-2 cursor-pointer bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={import.meta.env.VITE_BASE_FILE + images[0]?.url}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Off Tag */}
        {discountPrice > 0 && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-[12px] font-bold px-2 py-0.5 rounded-full shadow-lg">
            {discountPercent}٪
          </span>
        )}

        {/* Like Button */}
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

      {/* Content */}
      <div className="p-2 flex flex-col flex-1">
        {/* Title */}
        <h3 className="text-gray-800 font-semibold text-sm line-clamp-2 leading-tight min-h-10">
          {title}
        </h3>

        {/* Price */}
        <div className="flex items-baseline gap-1 flex-wrap mt-1">
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

        {/* Stock */}
        <div className="flex items-center justify-between text-[14px] my-1">
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

        {/* مشاهده محصول */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(
              `/product-details/${documentId}/${title.replaceAll(" ", "-")}`,
            );
          }}
          className="mt-auto  w-full h-11 flex items-center justify-center whitespace-nowrap cursor-pointer bg-blue-600 hover:bg-blue-500 text-white px-4 rounded-full transition-colors duration-200"
        >
          مشاهده محصول
        </button>
      </div>
    </div>
  );
}