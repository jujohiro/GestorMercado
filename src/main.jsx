import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; 
import { StoreProvider } from "./assets/context/StoreContext"; 
import { CategoryProvider } from "./assets/context/CategoryContext.jsx";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>    
      <StoreProvider> 
        <CategoryProvider>
        <App />
        </CategoryProvider>
      </StoreProvider>
    </BrowserRouter>
  </StrictMode>
);

