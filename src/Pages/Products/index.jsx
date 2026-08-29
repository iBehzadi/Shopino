import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import fetchData from "../../Utils/fetchData";
import ProductCard from "../../Components/ProductCard";

export default function Products() {
  const [params] = useSearchParams();
  // const category = params.get("category");
  const [products, setProducts] = useState([]);
  useEffect(() => {
    (async () => {
      const data = await fetchData("products?populate=*");
      setProducts(data.data);
      // console.log(data.data[0].images);
    })();
  }, []);
  return (
    <div className=" mt-24 mx-12">
      <div className="flex items-center justify-center my-10">
        <h1>محصولات</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {products.map((prd) => (
          <ProductCard
            key={prd.documentId}
            id={prd.documentId}
            name={prd.title}
            description={prd.description}
            price={prd.price}
            stock={prd.stock}
            discountPrice={prd.discountPrice}
            images={prd.images}
          />
        ))}
      </div>
    </div>
  );
}
