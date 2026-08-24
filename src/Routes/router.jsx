import { createBrowserRouter } from "react-router-dom";
import { Cart, Home, ProductDetails, Products, Profile } from "../Pages";
import Layout from "../Layout/layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "products/:categoryId/:categoryTitle",
        element: <Products />,
      },
      {
        path: "product-details/:id/:title",
        element: <ProductDetails />,
      },
      {
        element: <Protected />,
        children: [
          {
            path: "/cart",
            element: <Cart />,
          },
          {
            path: "/profile",
            element: <Profile />,
          },
        ],
      },
    ],
  },
]);
export default router;
