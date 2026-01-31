import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Header.css';

export default function Header() {
  const { cartCount } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <span className="logo-icon">AG</span>
          <span className="logo-text">Artesanías GT</span>
        </Link>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`hamburger ${menuOpen ? 'open' : ''}`}></span>
        </button>

        <nav className={`nav ${menuOpen ? 'nav-open' : ''}`}>
          <NavLink to="/" onClick={() => setMenuOpen(false)}>Inicio</NavLink>
          <NavLink to="/catalogo" onClick={() => setMenuOpen(false)}>Catálogo</NavLink>
          <NavLink to="/nosotros" onClick={() => setMenuOpen(false)}>Nosotros</NavLink>
          <NavLink to="/contacto" onClick={() => setMenuOpen(false)}>Contacto</NavLink>
        </nav>

        <Link to="/carrito" className="cart-link">
          <span className="cart-icon">Carrito</span>
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </Link>
      </div>
    </header>
  );
}
