import { createBrowserRouter } from "react-router-dom";
import {
  About,
  Auth,
  Cart,
  Checkout,
  Home,
  ProductDetails,
  Products,
  Profile,
} from "../Pages";
import Layout from "../Layout";
import Protected from "../Layout/Protected";
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
        path: "auth",
        element: <Auth />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "product-details/:id/:title",
        element: <ProductDetails />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        element: <Protected />,
        children: [
          {
            path: "checkout",
            element: <Checkout />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
        ],
      },
    ],
  },
]);
export default router;
