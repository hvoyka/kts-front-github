import React from "react";

import ReactDOM from "react-dom";
import "assets/styles/fonts.css";
import "normalize.css";
import "assets/styles/reset.css";
import "assets/styles/global.css";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
