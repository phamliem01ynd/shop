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
import { ThemeWrapper } from "./components/context/themeContext";
import { Provider } from "react-redux";
import LanguageWrapper from "./components/context/languageContext";
import store from "./components/redux/store";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store = {store}>
    <LanguageWrapper>
      <ThemeWrapper>
        <AuthWrapper>
          <CategoryWrapper>
            <ProductWrapper>
              <RouterProvider router={routes} />
            </ProductWrapper>
          </CategoryWrapper>
        </AuthWrapper>
      </ThemeWrapper>
    </LanguageWrapper>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
