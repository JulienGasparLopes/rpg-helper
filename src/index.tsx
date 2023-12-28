import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Admin from "./Admin";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
const isAdmin = window.location.pathname === "/admin";
root.render(
  <React.StrictMode>
    {isAdmin && <Admin />}
    <App />
  </React.StrictMode>
);
