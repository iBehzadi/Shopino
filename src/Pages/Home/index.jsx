import React from "react";
import Hero from "./Hero";
import Categories from "./Categories";
import FeaturedProducts from "./FeaturedProducts";

export default function Home() {
  return (
    <div>
      <Hero />
      <Categories />
      <FeaturedProducts />
    </div>
  );
}
