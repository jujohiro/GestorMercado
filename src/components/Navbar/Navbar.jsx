import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Navbar.css";
import { useState } from "react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error.message);
    }
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-title">Gestor de Mercado</Link>
      </div>

      <div className="navbar-menu-icon" onClick={toggleMenu}>
        ☰
      </div>

      <div className={`navbar-links-container ${menuOpen ? "active" : ""}`}>
        <ul className="navbar-links">
          <li><Link to="/productos/lista" onClick={toggleMenu}>Productos</Link></li>
          <li><Link to="/productos/agregar" onClick={toggleMenu}>Agregar Producto</Link></li>
          <li><Link to="/categorias" onClick={toggleMenu}>Categorías</Link></li>
          <li><Link to="/comparar-precios" onClick={toggleMenu}>Comparar Precios</Link></li>
          <li><Link to="/filter-products" onClick={toggleMenu}>Filtrar Productos</Link></li>
          <li><Link to="/resumen-mensual" onClick={toggleMenu}>Resumen Mensual</Link></li>
          <li><Link to="/soporte" onClick={toggleMenu}>Soporte</Link></li>
        </ul>
      </div>

      <div className="navbar-right">
        {user && (
          <>
            <div className="user-info">
              <img
                src={user.photoURL || "/default-avatar.png"}
                alt="Perfil"
                className="navbar-profile-img"
              />
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
