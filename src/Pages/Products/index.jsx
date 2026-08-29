import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import fetchData from "../../Utils/fetchData";
import ProductCard from "../../Components/ProductCard";

export default function Products() {
  const [params] = useSearchParams();
  const category = params.get("category");
  const [products, setProducts] = useState([]);
  useEffect(() => {
    (async () => {
      const data = category
        ? await fetchData(
            `products?filters[categories][slug][$eq]=${category}&populate=*`,
          )
        : await fetchData(`products?populate=*`);
      setProducts(data.data);
    })();
  }, [category]);
  return (
    <div className=" mt-24 mx-12">
      <div className="flex flex-col items-center justify-center my-10">
        <h1>محصولات</h1>
        <hr className="h-2 w-full text-blue-300 my-4" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {products.map((prd) => (
          <ProductCard
            product={prd}
            key={prd.id}
          />
        ))}
      </div>
    </div>
  );
}
