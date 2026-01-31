import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Carrito.css';

export default function Carrito() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();
  const hasEncargo = cartItems.some(item => item.tipo === 'por_encargo');

  if (cartItems.length === 0) {
    return (
      <div className="carrito-empty">
        <div className="empty-icon">🛒</div>
        <h1>Tu carrito está vacío</h1>
        <p>¡Descubre nuestras artesanías únicas!</p>
        <Link to="/catalogo" className="btn btn-primary">Ver Catálogo</Link>
      </div>
    );
  }

  return (
    <div className="carrito-page">
      <h1>Tu Carrito</h1>

      <div className="carrito-container">
        <div className="carrito-items">
          {cartItems.map(item => (
            <article key={item.id} className="cart-item">
              <Link to={`/producto/${item.id}`} className="item-image">
                <img src={item.imagen} alt={item.nombre} />
              </Link>

              <div className="item-details">
                <Link to={`/producto/${item.id}`}>
                  <h3>{item.nombre}</h3>
                </Link>
                <p className="item-artesano">Por {item.artesano}</p>
                <p className="item-origin">{item.origen}</p>
                {item.tipo === 'por_encargo' && (
                  <span className="item-badge">Por Encargo</span>
                )}
              </div>

              <div className="item-quantity">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  aria-label="Reducir cantidad"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  disabled={item.stock > 0 && item.quantity >= item.stock}
                  aria-label="Aumentar cantidad"
                >
                  +
                </button>
              </div>

              <div className="item-price">
                <span className="unit-price">Q{item.precio.toLocaleString('es-GT')}</span>
                <span className="total-price">Q{(item.precio * item.quantity).toLocaleString('es-GT')}</span>
              </div>

              <button
                className="remove-btn"
                onClick={() => removeFromCart(item.id)}
                aria-label="Eliminar producto"
              >
                ✕
              </button>
            </article>
          ))}
        </div>

        <aside className="carrito-summary">
          <h2>Resumen del Pedido</h2>

          <div className="summary-row">
            <span>Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} productos)</span>
            <span>Q{cartTotal.toLocaleString('es-GT')}</span>
          </div>

          <div className="summary-row">
            <span>Envío</span>
            <span className="shipping-note">Calculado al finalizar</span>
          </div>

          <div className="summary-total">
            <span>Total estimado</span>
            <span>Q{cartTotal.toLocaleString('es-GT')}</span>
          </div>

          {hasEncargo && (
            <p className="encargo-note">
              Las piezas por encargo se agregan a la cola de producción. Te confirmaremos el tiempo exacto
              de elaboración por correo.
            </p>
          )}

          <Link to="/checkout" className="btn btn-primary checkout-btn">
            Proceder al Pago
          </Link>

          <Link to="/catalogo" className="continue-shopping">
            ← Continuar Comprando
          </Link>

          <div className="payment-info">
            <p>Aceptamos:</p>
            <div className="payment-methods">
              <span>💳 Tarjetas</span>
              <span>🏦 Transferencia</span>
              <span>💵 PayPal</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
