import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import StoreSelector from "../StoreSelector/StoreSelector";
import "./Navbar.css";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();         // Cierra sesión en Firebase
      navigate("/login");     // Redirige al login
    } catch (error) {
      console.error("Error al cerrar sesión:", error.message);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-title">Gestor de Mercado</Link>
      </div>

      {user && (
        <div className="navbar-center">
          <ul className="navbar-links">
            <li><Link to="/productos/lista">Productos</Link></li>
            <li><Link to="/productos/agregar">Agregar Producto</Link></li>
            <li><Link to="/categorias"> Categorías</Link></li>
            <li><Link to="/comparar-precios"> Comparar Precios</Link></li>
            <li><Link to="/filter-products"> Filtrar Productos</Link></li>
            <li><Link to="/resumen-mensual"> Resumen Mensual</Link></li>
          </ul>
        </div>
      )}

      <div className="navbar-right">
        {user && (
          <>
            <StoreSelector />
            <div className="user-info">
              <img src={user.photoURL || "/default-avatar.png"} alt="Perfil" className="navbar-profile-img" />
              <span className="user-name">{user.displayName || user.email}</span>
            </div>
            <button onClick={handleLogout} className="logout-btn">Cerrar Sesión</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
