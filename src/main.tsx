import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import { BrowserRouter, useRoutes } from "react-router-dom";
import "./scss/index.scss";
import { worker } from "./mocks/browser";

if (import.meta.env.DEV) {
  worker.start();
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
