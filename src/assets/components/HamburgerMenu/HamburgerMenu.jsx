import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import "./HamburgerMenu.css";

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Cerrar menú al hacer clic en un enlace
  const handleLinkClick = () => setIsOpen(false);

  return (
    <div className="hamburger-container">
      <FaBars className="hamburger-icon" onClick={toggleMenu} />
      {isOpen && (
        <div className="hamburger-dropdown">
          <span className="menu-section">🛒 Gestion de productos</span>
          <Link to="/select-store" onClick={handleLinkClick} className="hamburger-link">Seleccionar tienda</Link>
          <Link to="/categorias" onClick={handleLinkClick} className="hamburger-link">Categorias</Link>
        

          <span className="menu-section"> Filtros y Analisis</span>
          <Link to="/productos/lista" onClick={handleLinkClick} className="hamburger-link">lista de productos y filtro</Link>
          <Link to="/compare-prices" onClick={handleLinkClick} className="hamburger-link">Comparación de precios</Link>
          <Link to="/monthly-summary" onClick={handleLinkClick} className="hamburger-link">Resumen mensual</Link>

          <span className="menu-section">Cuenta y soporte</span>
          <Link to="/perfil" onClick={handleLinkClick} className="hamburger-link">Perfil de usuario</Link>
          <Link to="/soporte" onClick={handleLinkClick} className="hamburger-link">Soporte</Link>
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;
