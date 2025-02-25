import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/login/login";
export const routes = createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
      {
        path: "login",
        element: <Login />,
      }
    ]
  }
]
)