import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import CryptoContext from "./CryptoContext";

ReactDOM.createRoot(document.getElementById("root")).render(
    <CryptoContext>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CryptoContext>
);
