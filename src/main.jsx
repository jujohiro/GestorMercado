import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // ✅ Importa BrowserRouter
import { StoreProvider } from "./assets/context/StoreContext"; // ✅ Mantén StoreProvider
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>    
      <StoreProvider> 
        <App />
      </StoreProvider>
    </BrowserRouter>
  </StrictMode>
);

