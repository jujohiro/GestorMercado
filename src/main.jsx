import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; 
import { StoreProvider } from "./assets/context/StoreContext"; 
import { CategoryProvider } from "./assets/context/CategoryContext.jsx";
import { ProductProvider } from "./assets/context/ProductContext.jsx";
import "./index.css";
import App from "./App.jsx";

  createRoot(document.getElementById("root")).render(
    <StrictMode>
      <BrowserRouter>
        <StoreProvider>
          <CategoryProvider>
            <ProductProvider>
              <App />
            </ProductProvider>
          </CategoryProvider>
        </StoreProvider>
      </BrowserRouter>
    </StrictMode>
  )
