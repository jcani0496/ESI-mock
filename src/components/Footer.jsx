import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Artesanías GT</h3>
          <p>Conectamos el arte tradicional guatemalteco con el mundo. Cada pieza cuenta una historia de generaciones.</p>
        </div>

        <div className="footer-section">
          <h4>Navegación</h4>
          <nav>
            <Link to="/catalogo">Catálogo</Link>
            <Link to="/nosotros">Nosotros</Link>
            <Link to="/contacto">Contacto</Link>
            <Link to="/politicas">Políticas</Link>
          </nav>
        </div>

        <div className="footer-section">
          <h4>Categorías</h4>
          <nav>
            <Link to="/catalogo?categoria=ceramica">Cerámica</Link>
            <Link to="/catalogo?categoria=textil">Textiles</Link>
            <Link to="/catalogo?categoria=madera">Madera</Link>
            <Link to="/catalogo?categoria=joyeria">Joyería</Link>
          </nav>
        </div>

        <div className="footer-section">
          <h4>Contacto</h4>
          <p>Email: info@artesaniasgt.com</p>
          <p>Tel: +502 2222-3333</p>
          <p>Ciudad de Guatemala, Guatemala</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 Artesanías GT. Todos los derechos reservados.</p>
        <p>Hecho con orgullo en Guatemala</p>
      </div>

      <div className="footer-credits">
        <p>Elaborado por Juan Carlos Nolasco Figueroa para ESI School of Management en el curso e-business and project management</p>
      </div>
    </footer>
  );
}
