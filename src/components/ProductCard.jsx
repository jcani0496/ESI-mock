import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  const getTipoBadge = (tipo) => {
    switch (tipo) {
      case 'edicion_limitada':
        return { text: 'Edición Limitada', class: 'badge-limited' };
      case 'por_encargo':
        return { text: 'Por Encargo', class: 'badge-custom' };
      default:
        return { text: 'Stock', class: 'badge-stock' };
    }
  };

  const badge = getTipoBadge(product.tipo);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.stock > 0 || product.tipo === 'por_encargo') {
      addToCart(product);
    }
  };

  return (
    <article className="product-card">
      <Link to={`/producto/${product.id}`}>
        <div className="product-image-container">
          <img src={product.imagen} alt={product.nombre} className="product-image" />
          {badge && <span className={`product-badge ${badge.class}`}>{badge.text}</span>}
        </div>
        <div className="product-info">
          <span className="product-category">{product.categoria}</span>
          <h3 className="product-name">{product.nombre}</h3>
          <p className="product-artesano">Por {product.artesano}</p>
          <p className="product-origin">{product.origen}</p>
          <div className="product-footer">
            <span className="product-price">Q{product.precio.toLocaleString('es-GT')}</span>
            <div className="product-footer-meta">
              <span className={`product-stock ${product.stock === 0 && product.tipo !== 'por_encargo' ? 'out-of-stock' : ''}`}>
                {product.disponibilidad}
              </span>
              {product.cupos && (
                <span className="product-cupo">
                  Cupo {product.cupos.disponibles}/{product.cupos.total}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
      <button
        className="add-to-cart-btn"
        onClick={handleAddToCart}
        disabled={product.stock === 0 && product.tipo !== 'por_encargo'}
      >
        {product.tipo === 'por_encargo' ? 'Solicitar' : 'Agregar al carrito'}
      </button>
    </article>
  );
}
