import { createBrowserRouter } from "react-router-dom";
import { Home, Products } from "../Pages";
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
        path:'products',
        element:<Products />
      }
    ],
  },
]);
export default router