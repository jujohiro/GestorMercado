import { Link } from "react-router-dom";
import StoreSelector from "../StoreSelector/StoreSelector";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>Gestor de Mercado</h1>
      <StoreSelector/>
      <div>
        <Link to="/">Inicio</Link>
        <Link to="/login">Iniciar Sesión</Link>
      </div>
    </nav>
  );
};

export default Navbar;