import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import Modal from '../components/Modal';
import productos from '../data/productos.json';
import './Producto.css';

export default function Producto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('descripcion');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  const product = productos.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="producto-not-found">
        <h1>Producto no encontrado</h1>
        <Link to="/catalogo" className="btn btn-primary">Volver al catálogo</Link>
      </div>
    );
  }

  const relatedProducts = productos
    .filter(p => p.categoria === product.categoria && p.id !== product.id)
    .slice(0, 4);

  const categoriaLabels = {
    ceramica: 'Cerámica',
    textil: 'Textiles',
    madera: 'Madera',
    joyeria: 'Joyería',
    piedra: 'Piedra',
    fibras: 'Fibras',
    papel: 'Papel'
  };

  const categoriaLabel = categoriaLabels[product.categoria] || product.categoria;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsModalOpen(true);
  };

  const handlePrevImage = () => {
    setSelectedImage((prev) => (prev === 0 ? product.galeria.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setSelectedImage((prev) => (prev === product.galeria.length - 1 ? 0 : prev + 1));
  };

  const historia =
    product.historia ||
    `Esta pieza se elabora en ${product.origen} por ${product.artesano}. Cada detalle refleja técnicas tradicionales y un proceso artesanal responsable.`;

  const proceso =
    product.proceso || [
      'Selección de materiales locales y revisión de calidad.',
      'Elaboración manual en taller siguiendo la técnica tradicional.',
      'Acabados, control de calidad y verificación de medidas.',
      'Empaque protector e inclusión de ficha del artesano.'
    ];

  const cupoInfo = product.cupos || (
    product.tipo === 'por_encargo'
      ? { periodo: 'semanal', total: 6, disponibles: 4 }
      : product.tipo === 'edicion_limitada'
        ? { periodo: 'edicion', total: Math.max(product.stock + 5, 10), disponibles: product.stock }
        : null
  );

  const periodoLabel = cupoInfo?.periodo === 'edicion' ? 'edición' : cupoInfo?.periodo;

  const getTipoBadge = (tipo) => {
    switch (tipo) {
      case 'edicion_limitada':
        return { text: 'Edición Limitada', class: 'badge-limited' };
      case 'por_encargo':
        return { text: 'Por Encargo', class: 'badge-custom' };
      default:
        return { text: 'Stock', class: 'badge-available' };
    }
  };

  const badge = getTipoBadge(product.tipo);

  return (
    <div className="producto-page">
      <nav className="breadcrumb">
        <Link to="/">Inicio</Link>
        <span>/</span>
        <Link to="/catalogo">Catálogo</Link>
        <span>/</span>
        <Link to={`/catalogo?categoria=${product.categoria}`}>{categoriaLabel}</Link>
        <span>/</span>
        <span>{product.nombre}</span>
      </nav>

      <div className="producto-container">
        <div className="producto-gallery">
          <button
            type="button"
            className="main-image"
            onClick={() => setIsZoomOpen(true)}
            aria-label="Ampliar imagen"
          >
            <img src={product.galeria[selectedImage]} alt={product.nombre} />
          </button>
          <div className="thumbnail-list">
            {product.galeria.map((img, index) => (
              <button
                key={index}
                className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                onClick={() => setSelectedImage(index)}
              >
                <img src={img} alt={`${product.nombre} - Vista ${index + 1}`} />
              </button>
            ))}
          </div>
        </div>

        <div className="producto-info">
          <span className={`producto-badge ${badge.class}`}>{badge.text}</span>
          <h1>{product.nombre}</h1>

          <div className="producto-meta">
            <p className="artesano">
              <strong>Artesano:</strong> {product.artesano}
            </p>
            <p className="origen">
              <strong>Origen:</strong> {product.origen}
            </p>
          </div>

          <p className="precio">Q{product.precio.toLocaleString('es-GT')}</p>

          <p className="descripcion">{product.descripcion}</p>

          <div className="producto-actions">
            {product.stock > 0 || product.tipo === 'por_encargo' ? (
              <>
                <div className="quantity-selector">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span>{quantity}</span>
                  <button
                    onClick={() => setQuantity(q => product.stock > 0 ? Math.min(product.stock, q + 1) : q + 1)}
                    disabled={product.stock > 0 && quantity >= product.stock}
                  >
                    +
                  </button>
                </div>
                <button className="btn btn-primary add-btn" onClick={handleAddToCart}>
                  {product.tipo === 'por_encargo' ? 'Solicitar pieza' : 'Agregar al carrito'}
                </button>
              </>
            ) : (
              <p className="out-of-stock-message">Este producto no está disponible actualmente</p>
            )}
          </div>

          {cupoInfo && (
            <div className="cupo-info">
              <h4>Cupos y capacidad</h4>
              <div className="cupo-grid">
                <div>
                  <span className="cupo-label">Periodo</span>
                  <span className="cupo-value">{periodoLabel}</span>
                </div>
                <div>
                  <span className="cupo-label">Total</span>
                  <span className="cupo-value">{cupoInfo.total} piezas</span>
                </div>
                <div>
                  <span className="cupo-label">Disponibles</span>
                  <span className="cupo-value">{cupoInfo.disponibles} piezas</span>
                </div>
              </div>
              <p className="cupo-note">
                La demanda se ajusta a la capacidad del taller para asegurar calidad y tiempos honestos.
              </p>
            </div>
          )}

          {product.tipo === 'por_encargo' && (
            <div className="encargo-notice">
              <h4>Producto Por Encargo</h4>
              <p>Esta pieza se elaborará especialmente para ti. El tiempo de elaboración es de <strong>{product.tiempoElaboracion}</strong>.</p>
              {product.cola && <p className="encargo-cola">Cola actual estimada: {product.cola}</p>}
            </div>
          )}

          {/* Qué Incluye */}
          <div className="que-incluye">
            <h3>¿Qué Incluye?</h3>
            <ul>
              {product.incluye.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Pestañas de información detallada */}
      <div className="producto-tabs">
        <div className="tabs-header">
          <button
            className={`tab-btn ${activeTab === 'descripcion' ? 'active' : ''}`}
            onClick={() => setActiveTab('descripcion')}
          >
            Ficha Técnica
          </button>
          <button
            className={`tab-btn ${activeTab === 'historia' ? 'active' : ''}`}
            onClick={() => setActiveTab('historia')}
          >
            Historia y Proceso
          </button>
          <button
            className={`tab-btn ${activeTab === 'materiales' ? 'active' : ''}`}
            onClick={() => setActiveTab('materiales')}
          >
            Materiales
          </button>
          <button
            className={`tab-btn ${activeTab === 'cuidado' ? 'active' : ''}`}
            onClick={() => setActiveTab('cuidado')}
          >
            Guía de Cuidado
          </button>
        </div>

        <div className="tabs-content">
          {activeTab === 'descripcion' && (
            <div className="tab-panel">
              <div className="ficha-tecnica">
                <dl>
                  <dt>Categoría</dt>
                  <dd>{categoriaLabel}</dd>

                  <dt>Dimensiones</dt>
                  <dd>{product.dimensiones}</dd>

                  <dt>Tiempo de Elaboración</dt>
                  <dd>{product.tiempoElaboracion}</dd>

                  <dt>Disponibilidad</dt>
                  <dd className={product.stock === 0 && product.tipo !== 'por_encargo' ? 'out-of-stock' : ''}>
                    {product.disponibilidad}
                  </dd>

                  {product.stock > 0 && (
                    <>
                      <dt>En existencia</dt>
                      <dd>{product.stock} unidades</dd>
                    </>
                  )}

                  <dt>Artesano</dt>
                  <dd>{product.artesano}</dd>

                  <dt>Origen</dt>
                  <dd>{product.origen}</dd>
                </dl>
              </div>
            </div>
          )}

          {activeTab === 'historia' && (
            <div className="tab-panel">
              <h4>Historia de la pieza</h4>
              <p className="historia-text">{historia}</p>

              <h4>Proceso artesanal</h4>
              <ol className="proceso-list">
                {proceso.map((paso, index) => (
                  <li key={index}>{paso}</li>
                ))}
              </ol>

              <div className="calidad-box">
                <h5>Control de calidad</h5>
                <p>
                  Cada pieza pasa por una revisión de medidas, acabados y empaque protector antes del despacho.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'materiales' && (
            <div className="tab-panel">
              <h4>Materiales Utilizados</h4>
              <ul className="materiales-list">
                {product.materiales.map((material, index) => (
                  <li key={index}>{material}</li>
                ))}
              </ul>
              <p className="materiales-note">
                Todos nuestros productos están elaborados con materiales de la más alta calidad,
                seleccionados cuidadosamente por nuestros artesanos siguiendo técnicas tradicionales.
              </p>
            </div>
          )}

          {activeTab === 'cuidado' && (
            <div className="tab-panel">
              <h4>Instrucciones de Cuidado</h4>
              <p className="cuidado-text">{product.cuidado}</p>
              <div className="cuidado-tips">
                <h5>Recomendaciones Generales:</h5>
                <ul>
                  <li>Guarda la pieza en un lugar seco y protegido</li>
                  <li>Evita la exposición prolongada a la luz solar directa</li>
                  <li>Manipula con cuidado, las artesanías son piezas delicadas</li>
                  <li>En caso de dudas, contáctanos para asesoría personalizada</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      <section className="reviews-section">
        <h2>Reseñas verificadas</h2>
        <div className="reviews-grid">
          <article className="review-card">
            <p className="review-text">“Excelente calidad y acabados impecables. Se nota el trabajo artesanal.”</p>
            <div className="review-meta">
              <span>María P.</span>
              <span>⭐⭐⭐⭐⭐</span>
            </div>
          </article>
          <article className="review-card">
            <p className="review-text">“Llegó bien empacado y con ficha del artesano. Muy recomendado.”</p>
            <div className="review-meta">
              <span>Carlos J.</span>
              <span>⭐⭐⭐⭐⭐</span>
            </div>
          </article>
          <article className="review-card">
            <p className="review-text">“La pieza es única y el proceso fue claro desde el inicio.”</p>
            <div className="review-meta">
              <span>Lucía R.</span>
              <span>⭐⭐⭐⭐</span>
            </div>
          </article>
        </div>

        <div className="review-form">
          <h3>Deja tu reseña (mockup)</h3>
          <p>Este formulario es ilustrativo. La captura real se habilitará en la fase de piloto.</p>
          <div className="review-form-grid">
            <input type="text" placeholder="Nombre" aria-label="Nombre" />
            <input type="email" placeholder="Correo" aria-label="Correo" />
            <select aria-label="Calificación">
              <option value="">Calificación</option>
              <option value="5">★★★★★</option>
              <option value="4">★★★★</option>
              <option value="3">★★★</option>
              <option value="2">★★</option>
              <option value="1">★</option>
            </select>
            <textarea rows="3" placeholder="Escribe tu reseña"></textarea>
          </div>
          <button type="button" className="btn btn-secondary">Enviar reseña</button>
        </div>
      </section>

      {relatedProducts.length > 0 && (
        <section className="related-products">
          <h2>Productos Relacionados</h2>
          <div className="products-grid">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Producto agregado al carrito"
        actions={(
          <>
            <button className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>
              Seguir comprando
            </button>
            <button className="btn btn-primary" onClick={() => navigate('/carrito')}>
              Ver carrito
            </button>
          </>
        )}
      >
        <p>Agregaste <strong>{product.nombre}</strong> a tu carrito.</p>
        <p className="modal-note">Recuerda que los tiempos pueden variar según cupos y tipo de producto.</p>
      </Modal>

      {isZoomOpen && (
        <div className="zoom-overlay" onClick={() => setIsZoomOpen(false)}>
          <div className="zoom-content" onClick={(e) => e.stopPropagation()}>
            <button className="zoom-close" onClick={() => setIsZoomOpen(false)} aria-label="Cerrar">
              ×
            </button>
            {product.galeria.length > 1 && (
              <button className="zoom-nav prev" onClick={handlePrevImage} aria-label="Imagen anterior">
                ‹
              </button>
            )}
            <img src={product.galeria[selectedImage]} alt={product.nombre} />
            {product.galeria.length > 1 && (
              <button className="zoom-nav next" onClick={handleNextImage} aria-label="Imagen siguiente">
                ›
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
