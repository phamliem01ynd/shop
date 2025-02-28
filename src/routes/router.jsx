import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/login/login";
import Register from "../pages/login/register";
import HomePage from "../pages/home/homePage";
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
        path: "",
        element: <HomePage />,
      },
    ],
  },
]);
