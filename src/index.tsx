import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const deferRenderer = async () => {
  const { worker } = await import("./mocks/browser");
  return worker.start();
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
deferRenderer().then(() =>
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
);
