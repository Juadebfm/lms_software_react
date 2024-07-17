import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./context/AuthContext.jsx";
import { StudyMaterialsProvider } from "./context/StudyMaterialsContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <StudyMaterialsProvider>
        <App />
      </StudyMaterialsProvider>
    </AuthProvider>
  </React.StrictMode>
);
