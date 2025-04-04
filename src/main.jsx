import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; 
import { StoreProvider } from "./context/StoreContext.jsx"; 
import { CategoryProvider } from "./context/CategoryContext.jsx";
import { ProductProvider } from "./context/ProductContext.jsx";
import { AuthProvider } from "./context/AuthContext";
import "./index.css";
import App from "./App.jsx";

  createRoot(document.getElementById("root")).render(
    <StrictMode>
      <BrowserRouter>
      <AuthProvider>
        <StoreProvider>
          <CategoryProvider>
            <ProductProvider>
              <App />
            </ProductProvider>
          </CategoryProvider>
        </StoreProvider>
        </AuthProvider>
      </BrowserRouter>
    </StrictMode>
  )
