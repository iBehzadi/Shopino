import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import fetchData from "../../Utils/fetchData";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  useEffect(() => {
    (async () => {
      const data = await fetchData(`products/${id}?populate=*`);
      setProduct(data.data);
    })();
  }, [id]);
  const currentImage = product?.images[currentImageIndex].url;
  return (
    <div className="flex items-center mt-30 mx-10">
      {/* images */}
      <div className="w-100">
        <img src={import.meta.env.VITE_BASE_FILE + currentImage} alt="" />
        <div className="flex items-center justify-center">
          {product?.images.map((img, index) => (
            <img
              key={index}
              className="w-24"
              src={import.meta.env.VITE_BASE_FILE + img.url}
              onClick={() => setCurrentImageIndex(index)}
            />
          ))}
        </div>
      </div>
      {/* content */}
      <div>
        
      </div>
    </div>
  );
}
