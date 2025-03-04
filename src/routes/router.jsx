import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/login/login";
import Register from "../pages/login/register";
import HomePage from "../pages/home/homePage";
import CategoryPage from "../pages/category/categoryPage";
import ShopPage from "../pages/shop/shopPage";
import ProductPage from "../pages/product/productPage";
import AdminPage from "../pages/admin/adminPage";
import User from "../components/admin/user";
import ProductAdmin from "../components/admin/productAdmin";
import Category from "../components/admin/categoryAdmin";
import CartPage from "../pages/cart/cartPage";
export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path:"cart",
        element:<CartPage/>
      },
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "category/:categoryName",
        element: <CategoryPage />,
      },
      {
        path: "shop",
        element: <ShopPage />,
      },
      {
        path: "product/:productName",
        element: <ProductPage />,
      },
      {
        path: "admin",
        element: <AdminPage/>,
        children:[{
          path:"user",
          element:<User/>
        },
        {
          path:"product",
          element:<ProductAdmin/>,
        },
        {
          path:"category",
          element:<Category/>
        }
      ]
      }
    ],
  },
]);
