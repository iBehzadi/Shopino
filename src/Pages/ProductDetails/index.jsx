import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import fetchData from "../../Utils/fetchData";
import { useCartStore } from "../../Store/cartStore";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const addToCart = useCartStore((state) => state.addToCart);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const cartItems = useCartStore((state) => state.items);

  useEffect(() => {
    (async () => {
      const data = await fetchData(`products/${id}?populate=*`);
      setProduct(data.data);
    })();
  }, [id]);
  const currentImage = product?.images[currentImageIndex].url;

  const productQuantity = cartItems.find(
    (item) => item.documentId === product?.documentId,
  )?.cartQuantity;

  return (
    <div className="mt-30">
      <div className="text-gray-600 mx-6 text-sm my-6">
        {" "}
        فروشگاه / {product?.categories[0].name}
      </div>

      <div className="flex flex-col justify-center items-center sm:items-stretch sm:flex-row  mx-10 gap-10">
        {/* images */}
        <div className="w-100  border-gray-500  ">
          <img src={import.meta.env.VITE_BASE_FILE + currentImage} alt="" />
          <div className="flex items-center justify-center my-6">
            {product?.images.map((img, index) => (
              <img
                key={index}
                className="w-24 border border-gray-200 rounded cursor-pointer hover:shadow mx-1 p-2"
                src={import.meta.env.VITE_BASE_FILE + img.url}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>
        </div>
        {/* content */}
        <div className="flex flex-col sm:border-r px-10 items-start justify-start gap-4">
          <h1 className="font-bold text-2xl">{product?.title}</h1>
          <p className="text-gray-600 max-w-100 text-justify line-clamp-8">
            {product?.description}
          </p>
          <div>
            <span className="rounded-full px-4 py-1 text-[12px] text-gray-800 bg-gray-200">
              {product?.stock} عدد در انبار
            </span>
          </div>
          {cartItems.find((item) => item.documentId === product?.documentId) ? (
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => removeFromCart(product.documentId)}
                className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100"
              >
                حذف
              </button>

              <div className="flex items-center gap-3 rounded-lg border border-gray-200 p-1">
                <button
                disabled={productQuantity >= product.stock}
                  className="flex h-8 w-8 items-center disabled:opacity-45 justify-center rounded-md bg-gray-100 text-lg font-bold transition hover:bg-gray-200"
                  onClick={() => increaseQuantity(product.documentId)}
                >
                  +
                </button>

                <span className="min-w-6 text-center font-semibold">
                  {
                    productQuantity
                  }
                </span>

                <button
                  className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-100 text-lg font-bold transition hover:bg-gray-200"
                  onClick={() => decreaseQuantity(product.documentId)}
                >
                  −
                </button>
              </div>
            </div>
          ) : product?.stock > 0 ? (
            <button
              onClick={() => addToCart(product)}
              className="cursor-pointer bg-blue-600 w-full hover:bg-blue-500 text-white px-4 py-2 rounded-full"
            >
              افزودن به سبد خرید
            </button>
          ) : (
            <span className=" w-full flex items-center justify-center text-white bg-red-400 px-4 py-2 rounded-full">
              محصول ناموجود
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
