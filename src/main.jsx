import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import './index.css';
import { AuthProvider } from "./context/AuthContext"; // import AuthProvider

const rootElement = document.getElementById("root");

ReactDOM.createRoot(rootElement).render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
