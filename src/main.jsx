// index.js
import "./index.css";
import "./App.css"
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "../context/AutoContext";
import axios from 'axios';
//  Set Axios base url and credentials
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
axios.defaults.withCredentials = true;
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
