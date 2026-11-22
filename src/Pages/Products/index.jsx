import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import fetchData from "../../Utils/fetchData";
import { ProductCard, ProductCardSkeleton } from "../../Components";

export default function Products() {
  const [params] = useSearchParams();
  const category = params.get("category");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(12);
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({});

  const loadingItems = new Array(12)
    .fill(null)
    .map((_, index) => <ProductCardSkeleton key={index} />);

  const [sort, setSort] = useState("createdAt:desc");

  useEffect(() => {
    (async () => {
      const query = category
        ? `filters[categories][slug][$eq]=${category}&`
        : "";

      const data = await fetchData(
        `products?${query}populate=*&sort=${sort}&pagination[page]=${page}&pagination[pageSize]=${pageSize}`,
      );

      setProducts(data.data ?? []);
      setPagination(data.meta.pagination);
    })();
  }, [category, sort, page, pageSize]);

  useEffect(() => {
    setPage(1);
  }, [category, sort]);

  return (
    <div className=" mt-28 mx-12 ">
      <div className="flex items-center justify-between my-10 rounded-xl bg-white p-4 text-gray-700">
        <h3>محصولات</h3>
        <div>
          <span>مرتب سازی:</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="mr-4 rounded-lg border border-gray-300 p-2"
          >
            <option value="createdAt:desc">جدیدترین</option>
            <option value="price:asc">قیمت: صعودی</option>
            <option value="price:desc">قیمت: نزولی</option>
            <option value="discountPrice:desc">بیشترین تخفیف</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {products.length > 0
          ? products?.map((prd) => <ProductCard product={prd} key={prd.id} />)
          : loadingItems}
      </div>

      <div className="flex items-center justify-center gap-2 mt-12" dir="rtl">
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
          className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
          قبلی
        </button>

        <span className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold">
          {page}
        </span>

        <span className="text-gray-500">از</span>

        <span className="px-3 py-2 rounded-lg bg-gray-100 text-gray-700">
          {pagination.pageCount ?? 1}
        </span>

        <button
          disabled={page >= (pagination.pageCount ?? 1)}
          onClick={() => setPage((prev) => prev + 1)}
          className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
          بعدی
        </button>
      </div>
    </div>
  );
}
