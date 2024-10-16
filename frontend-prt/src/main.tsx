import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement!); // Make sure the element is not null

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
