import React from "react";

export default function ProductCardSkeleton() {
  return (
    <div className="group relative w-full h-full flex flex-col py-2 px-2 bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-200 rounded-md">
        <div className="w-full h-full bg-gray-200" />

        {/* Off Tag */}
        <div className="absolute top-2 left-2 w-10 h-5 bg-gray-300 rounded-full" />

        {/* Like Button */}
        <div className="absolute top-2 right-2 w-7 h-7 bg-gray-300 rounded-full" />
      </div>

      {/* Content */}
      <div className="p-2 flex flex-col flex-1">
        {/* Title */}
        <div className="space-y-2 min-h-10">
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-3/4" />
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mt-2">
          <div className="h-4 bg-gray-200 rounded w-20" />
          <div className="h-3 bg-gray-200 rounded w-12" />
          <div className="h-3 bg-gray-200 rounded w-10" />
        </div>

        {/* Stock */}
        <div className="flex items-center justify-between my-2">
          <div className="h-4 bg-gray-200 rounded w-20" />
        </div>

        {/* Button */}
        <div className="mt-auto w-full h-11 bg-gray-200 rounded-full" />
      </div>
    </div>
  );
}
