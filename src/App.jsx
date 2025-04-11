import { Routes, Route, Navigate } from "react-router-dom"; 
import { useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar/Navbar";
import CategoryManager from "./components/CategoryManager/CategoryManager";
import ProductForm from "./components/ProductForm/ProductForm";
import CategoryProducts from "./components/CategoryProducts/CategoryProducts";
import ProductList from "./components/ProductList/ProductList";
import Login from "./components/Auth/Login";
import HomeComponent from "./components/home";
import FilterProducts from "./components/GeneralPages/FilterProducts";
import PriceComparison from "../src/components/PriceComparison";
import MonthlySummary from "./components/GeneralPages/MontlySummary";
import ResetPassword from "./components/Auth/ResetPassword";
import Support from "./components/Support/Support";
import "./App.css";

function App() {
  const { user } = useAuth();

  return (
    <div className="app-container"> {/* Añadimos un contenedor principal */}
      {user && <Navbar />} {/* Este Navbar siempre se renderiza */}
      
      <div className="content"> {/* Este contenedor será el que cambie de contenido */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password" element={<ResetPassword />} /> 
          <Route path="/" element={user ? <HomeComponent correoUsuario={user.email} /> : <Navigate to="/login" />} />

          {user && (
            <>
              <Route path="/categorias" element={<CategoryManager />} />
              <Route path="/productos/:categoryName" element={<CategoryProducts />} />
              <Route path="/productos/agregar" element={<ProductForm />} /> 
              <Route path="/productos/agregar/:categoryName" element={<ProductForm />} /> 
              <Route path="/productos/lista" element={<ProductList />} />
              <Route path="/filter-products" element={<FilterProducts />} />
              <Route path="/comparar-precios" element={<PriceComparison />} />
              <Route path="/resumen-mensual" element={<MonthlySummary />} />
              <Route path="/soporte" element={<Support />} />
            </>
          )}
        </Routes>
      </div>
    </div>
  );
}

export default App;