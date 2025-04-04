import { Routes, Route, Navigate } from "react-router-dom"; 
import { useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar/Navbar";
import CategoryManager from "./components/CategoryManager/CategoryManager";
import ProductForm from "./components/ProductForm/ProductForm";
import CategoryProducts from "./components/CategoryProducts/CategoryProducts";
import ProductList from "./components/ProductList/ProductList";
import Login from "./components/Auth/Login";
import HomeComponent from "./components/Home";
import FilterProducts from "./components/GeneralPages/FilterProducts";
import PriceComparison from "../src/components/PriceComparison";
import MonthlySummary from "./components/GeneralPages/MontlySummary";
import ResetPassword from "./components/Auth/ResetPassword";
import "./App.css";

function App() {
  const { user } = useAuth();

  return (
    <>
      {user && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} /> 
        <Route path="/" element={user ? <HomeComponent correoUsuario={user.email} /> : <Navigate to="/login" />} />
        {user && (
          <>
            <Route path="/categorias" element={<CategoryManager />} />
            <Route path="/productos/:categoryName" element={<CategoryProducts />} />
            
            {/* 🔥 Cambiado para permitir agregar productos SIN categoría especificada */}
            <Route path="/productos/agregar" element={<ProductForm />} /> 
            <Route path="/productos/agregar/:categoryName" element={<ProductForm />} /> 

            <Route path="/productos/lista" element={<ProductList />} />
            <Route path="/filter-products" element={<FilterProducts />} />
            <Route path="/comparar-precios" element={<PriceComparison />} />
            <Route path="/resumen-mensual" element={<MonthlySummary />} />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
