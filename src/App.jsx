import { Routes, Route, Navigate } from "react-router-dom"; 
import { useAuth } from "./assets/context/AuthContext";
import Navbar from "./assets/components/Navbar/Navbar";
import CategoryManager from "./assets/components/CategoryManager/CategoryManager";
import ProductList from "./assets/components/ProductList/ProductList";
import ProductForm from "./assets/components/ProductForm/ProductForm";
import Login from "./assets/components/Auth/Login";
import HomeComponent from "./assets/components/Home";
import "./App.css";

function App() {
  const { user } = useAuth();

  return (
    <>
      {user && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={user ? <HomeComponent correoUsuario={user.email} /> : <Navigate to="/login" />} />
        {user && (
          <>
            <Route path="/Gestión categorias" element={<CategoryManager />} />
            <Route path="/productos/agregar" element={<ProductForm />} />
            <Route path="/Lista de Productos" element={<ProductList />} />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
