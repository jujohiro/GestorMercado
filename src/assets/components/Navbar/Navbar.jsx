import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import StoreSelector from "../StoreSelector/StoreSelector";
import "./Navbar.css";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1 className="navbar-title">Gestor de Mercado</h1>
      </div>

      {user && (
        <div className="navbar-center">
          <StoreSelector />
        </div>
      )}

      <div className="navbar-right">
        {user ? (
          <>
            <div className="user-info">
              <img src={user.photoURL || "/default-avatar.png"} alt="Perfil" className="navbar-profile-img" />
              <span className="user-name">{user.displayName || user.email}</span>
            </div>
            <button onClick={logout} className="logout-btn">Cerrar Sesión</button>
          </>
        ) : (
          <Link to="/login" className="login-btn">Iniciar Sesión</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;




