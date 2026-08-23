import React, { useEffect, useState } from "react";

export default function Products() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await fetch("http://localhost:1337/api/products");
      const data = await res.json();
      setProducts(data.data);
    })();
  }, []);
  return (
    <div>
      {products.map((item) => (
        <p key={item.id}>{item.title}</p>
      ))}
    </div>
  );
}
