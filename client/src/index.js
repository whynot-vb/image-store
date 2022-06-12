import React from "react";
import ReactDOM from "react-dom";
import "normalize.css";
import "./index.css";
import App from "./App.js";
import { store } from "./app/store";

import { Provider } from "react-redux";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
