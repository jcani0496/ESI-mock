import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import productos from '../data/productos.json';
import './Home.css';

export default function Home() {
  const productosDestacados = productos.filter(p => p.tipo === 'edicion_limitada' || p.stock <= 3).slice(0, 4);
  const categorias = [
    { id: 'ceramica', nombre: 'Cerámica', descripcion: 'Barro de Chinautla, mayólica y más' },
    { id: 'textil', nombre: 'Textiles', descripcion: 'Huipiles, cortes y bordados' },
    { id: 'madera', nombre: 'Madera', descripcion: 'Máscaras, marimbas y tallas' },
    { id: 'joyeria', nombre: 'Joyería', descripcion: 'Jade, plata y chaquira' },
  ];

  return (
    <div className="home">
      {/* Sección principal */}
      <section className="hero">
        <div className="hero-content">
          <h1>Arte Tradicional Guatemalteco</h1>
          <p>Descubre piezas únicas creadas por artesanos de todo Guatemala. Cada obra cuenta una historia de generaciones.</p>
          <div className="hero-buttons">
            <Link to="/catalogo" className="btn btn-primary">Ver Catálogo</Link>
            <Link to="/nosotros" className="btn btn-secondary">Nuestra Historia</Link>
          </div>
        </div>
        <div className="hero-image">
          <img src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=900&auto=format&fit=crop&fm=webp" alt="Artesanías guatemaltecas" />
        </div>
      </section>

      {/* Categorías */}
      <section className="categories-section">
        <div className="container">
          <h2>Explora por Categoría</h2>
          <div className="categories-grid">
            {categorias.map(cat => (
              <Link key={cat.id} to={`/catalogo?categoria=${cat.id}`} className="category-card">
                <h3>{cat.nombre}</h3>
                <p>{cat.descripcion}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Productos Destacados */}
      <section className="featured-section">
        <div className="container">
          <div className="section-header">
            <h2>Piezas Destacadas</h2>
            <Link to="/catalogo" className="view-all">Ver todo</Link>
          </div>
          <div className="products-grid">
            {productosDestacados.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Tipos de Productos */}
      <section className="types-section">
        <div className="container">
          <h2>Tipos de Productos</h2>
          <div className="types-grid">
            <div className="type-card">
              <h3>Repetibles</h3>
              <p>Piezas disponibles de inmediato que pueden reponerse según demanda.</p>
            </div>
            <div className="type-card">
              <h3>Edición Limitada</h3>
              <p>Creaciones exclusivas con tiraje limitado. Cada pieza es numerada.</p>
            </div>
            <div className="type-card">
              <h3>Por Encargo</h3>
              <p>Piezas personalizadas creadas especialmente para ti.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Confianza */}
      <section className="trust-section">
        <div className="container">
          <h2>Confianza y transparencia</h2>
          <div className="trust-grid">
            <div className="trust-card">
              <h3>Tiempos honestos</h3>
              <p>Indicamos claramente tiempos de elaboración y entrega según la capacidad del taller.</p>
            </div>
            <div className="trust-card">
              <h3>Cupos controlados</h3>
              <p>Las ediciones limitadas y encargos se manejan con cupos para proteger la calidad.</p>
            </div>
            <div className="trust-card">
              <h3>Historia real</h3>
              <p>Cada pieza incluye ficha del artesano, materiales y proceso de creación.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Historia */}
      <section className="story-section">
        <div className="container">
          <div className="story-content">
            <div className="story-text">
              <h2>Preservando Tradiciones</h2>
              <p>En Artesanías GT trabajamos directamente con comunidades artesanales de todo Guatemala. Cada compra apoya a familias que han mantenido vivas estas técnicas por generaciones.</p>
              <p>Nuestro portafolio curado incluye piezas de Quetzaltenango, Sololá, Totonicapán, Chichicastenango y muchas otras regiones con rica tradición artesanal.</p>
              <Link to="/nosotros" className="btn btn-primary">Conoce más</Link>
            </div>
            <div className="story-image">
              <img src="https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=600&auto=format&fit=crop&fm=webp" alt="Artesano trabajando" />
            </div>
          </div>
        </div>
      </section>

      {/* Llamado a la acción */}
      <section className="cta-section">
        <div className="container">
          <h2>¿Buscas algo especial?</h2>
          <p>Contáctanos para piezas personalizadas o pedidos especiales</p>
          <Link to="/contacto" className="btn btn-light">Contáctanos</Link>
        </div>
      </section>
    </div>
  );
}
