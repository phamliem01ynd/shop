import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import "../src/components/globalStyle.scss";
import { RouterProvider } from "react-router-dom";
import { routes } from "./routes/router";
import { AuthWrapper } from "./components/context/authContext";
import { ProductWrapper } from "./components/context/productContext";
import { CategoryWrapper } from "./components/context/categoryContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthWrapper>
    <CategoryWrapper>
      <ProductWrapper>
        <RouterProvider router={routes} />
      </ProductWrapper>
    </CategoryWrapper>
  </AuthWrapper>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
