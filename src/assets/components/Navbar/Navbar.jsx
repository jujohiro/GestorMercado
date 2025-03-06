import { Link } from "react-router-dom";
import StoreSelector from "../StoreSelector/StoreSelector";
import "./Navbar.css"; // ✅ Importamos los estilos mejorados

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-header">
        <h1 className="navbar-title">🛒 Gestor de Mercado</h1>
        <div className="navbar-links">
          <Link to="/">Inicio</Link>
          <Link to="/login">Iniciar Sesión</Link>
        </div>
      </div>

      <div className="navbar-store">
        <StoreSelector />
      </div>
    </nav>
  );
};

export default Navbar;

