import React from "react";
import ReactDOM from "react-dom/client";
import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./App.jsx";
import "./index.css";
import store from "./store/store.js";
import { i18nMain } from "./i18n/i18n.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18nMain}>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
        <ToastContainer></ToastContainer>
      </Provider>
    </I18nextProvider>
  </React.StrictMode>
);
