import { Routes, Route, Navigate } from "react-router-dom"; 
import { useAuth } from "./assets/context/AuthContext";
import Navbar from "./assets/components/Navbar/Navbar";
import CategoryManager from "./assets/components/CategoryManager/CategoryManager";
import ProductForm from "./assets/components/ProductForm/ProductForm";
import CategoryProducts from "./assets/components/CategoryProducts/CategoryProducts";
import ProductList from "./assets/components/ProductList/ProductList";
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
            <Route path="/categorias" element={<CategoryManager />} />
            <Route path="/productos/:categoryName" element={<CategoryProducts />} />
            <Route path="/productos/agregar/:categoryName" element={<ProductForm />} />
            <Route path="/productos/lista" element={<ProductList />} />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
