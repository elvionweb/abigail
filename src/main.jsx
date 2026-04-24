import React from "react";
import ReactDOM from "react-dom/client";
import { Howler } from "howler";
import App from "./App";
import "./index.css";

// Increase Howler's HTML5 Audio pool size to prevent exhaustion errors
// especially caused by hot-restarts or React StrictMode creating instances 
// that can't be cleanly unloaded while locked.
Howler.html5PoolSize = 100;

ReactDOM.createRoot(document.getElementById("app")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
