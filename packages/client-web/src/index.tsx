import React from "react";
import { createRoot } from "react-dom/client";

import AppRoot from "./AppRoot";
import reportWebVitals from "./reportWebVitals";
import { initMocks } from "./__mocks__";

const renderRoot = () => {
  const container = document.getElementById("root");

  if (container) {
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <AppRoot />
      </React.StrictMode>,
    );
  }
};

const initApp = async () => {
  // await initMocks();
  renderRoot();
};

initApp();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
