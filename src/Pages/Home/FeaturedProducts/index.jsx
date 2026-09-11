import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import fetchData from "../../../Utils/fetchData";
import ProductCard from "../../../Components/ProductCard";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await fetchData(
        "products?filters[isFeatured][$eq]=true&populate=*",
      );
      setProducts(res.data || []);
    })();
  }, []);
  return (
    <section className="container mx-auto px-4 py-12 max-w-7xl ">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">محصولات ویژه</h2>
          <p className="text-gray-500 mt-2">بهترین انتخاب‌ها برای شما</p>
        </div>
      </div>

      <div className="bg-[#f5f5f5] rounded-3xl px-5 py-10">
        <Swiper
          slidesPerView={1.2}
          modules={[Navigation]}
          navigation
          spaceBetween={24}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
        >
          {products.map((product) => (
            <SwiperSlide className="my-2" key={product.documentId}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
