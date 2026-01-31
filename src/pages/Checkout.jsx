import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Checkout.css';

export default function Checkout() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const hasEncargo = cartItems.some(item => item.tipo === 'por_encargo');
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Datos personales
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    // Envío
    direccion: '',
    ciudad: '',
    estado: '',
    codigoPostal: '',
    instrucciones: '',
    // Pago
    metodoPago: 'tarjeta',
    nombreTarjeta: '',
    numeroTarjeta: '',
    expiracion: '',
    cvv: ''
  });
  const [orderComplete, setOrderComplete] = useState(false);

  if (cartItems.length === 0 && !orderComplete) {
    return (
      <div className="checkout-empty">
        <h1>No hay productos en tu carrito</h1>
        <Link to="/catalogo" className="btn btn-primary">Ir al Catálogo</Link>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateStep = () => {
    if (step === 1) {
      return formData.nombre && formData.apellido && formData.email && formData.telefono;
    }
    if (step === 2) {
      return formData.direccion && formData.ciudad && formData.estado && formData.codigoPostal;
    }
    if (step === 3) {
      if (formData.metodoPago === 'tarjeta') {
        return formData.nombreTarjeta && formData.numeroTarjeta && formData.expiracion && formData.cvv;
      }
      return true;
    }
    return true;
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep(s => Math.min(4, s + 1));
    }
  };

  const prevStep = () => {
    setStep(s => Math.max(1, s - 1));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 4) {
      // Simular procesamiento de pedido
      setOrderComplete(true);
      clearCart();
    }
  };

  const shippingCost = cartTotal >= 800 ? 0 : 45;
  const total = cartTotal + shippingCost;

  if (orderComplete) {
    return (
      <div className="checkout-success">
        <div className="success-icon">✓</div>
        <h1>¡Pedido Confirmado!</h1>
        <p>Gracias por tu compra. Hemos enviado un correo de confirmación a <strong>{formData.email}</strong></p>
        <div className="order-number">
          <span>Número de pedido:</span>
          <strong>ART-{Date.now().toString().slice(-8)}</strong>
        </div>
        <p className="delivery-note">Recibirás actualizaciones sobre el estado de tu envío.</p>
        <div className="order-status">
          <h3>Estado del pedido (mockup)</h3>
          <ul className="status-timeline">
            <li className="done">Pedido confirmado</li>
            <li className="in-progress">En preparación</li>
            <li>Enviado</li>
            <li>Entregado</li>
          </ul>
          <div className="transaccionales">
            <h4>Mensajes transaccionales</h4>
            <p>Confirmación, preparación, envío con tracking y entrega final.</p>
          </div>
        </div>
        <Link to="/" className="btn btn-primary">Volver al Inicio</Link>
      </div>
    );
  }

  const steps = [
    { num: 1, name: 'Datos' },
    { num: 2, name: 'Envío' },
    { num: 3, name: 'Pago' },
    { num: 4, name: 'Confirmar' }
  ];

  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <h1>Finalizar Compra</h1>
        <div className="steps-indicator">
          {steps.map((s, i) => (
            <div key={s.num} className={`step ${step >= s.num ? 'active' : ''} ${step > s.num ? 'completed' : ''}`}>
              <span className="step-number">{step > s.num ? '✓' : s.num}</span>
              <span className="step-name">{s.name}</span>
              {i < steps.length - 1 && <span className="step-line"></span>}
            </div>
          ))}
        </div>
      </div>

      <div className="checkout-container">
        <form className="checkout-form" onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="form-section">
              <h2>Datos Personales</h2>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="nombre">Nombre *</label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="apellido">Apellido *</label>
                  <input
                    type="text"
                    id="apellido"
                    name="apellido"
                    value={formData.apellido}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Correo Electrónico *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="telefono">Teléfono *</label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    placeholder="55 1234 5678"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="form-section">
              <h2>Dirección de Envío</h2>
              <div className="form-grid">
                <div className="form-group full-width">
                  <label htmlFor="direccion">Dirección *</label>
                  <input
                    type="text"
                    id="direccion"
                    name="direccion"
                    value={formData.direccion}
                    onChange={handleChange}
                    placeholder="Calle, número, colonia"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="ciudad">Ciudad *</label>
                  <input
                    type="text"
                    id="ciudad"
                    name="ciudad"
                    value={formData.ciudad}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="estado">Estado *</label>
                  <select
                    id="estado"
                    name="estado"
                    value={formData.estado}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Seleccionar...</option>
                    <option value="Guatemala">Guatemala</option>
                    <option value="Sacatepequez">Sacatepéquez</option>
                    <option value="Chimaltenango">Chimaltenango</option>
                    <option value="Escuintla">Escuintla</option>
                    <option value="Santa Rosa">Santa Rosa</option>
                    <option value="Solola">Sololá</option>
                    <option value="Totonicapan">Totonicapán</option>
                    <option value="Quetzaltenango">Quetzaltenango</option>
                    <option value="Suchitepequez">Suchitepéquez</option>
                    <option value="Retalhuleu">Retalhuleu</option>
                    <option value="San Marcos">San Marcos</option>
                    <option value="Huehuetenango">Huehuetenango</option>
                    <option value="Quiche">Quiché</option>
                    <option value="Baja Verapaz">Baja Verapaz</option>
                    <option value="Alta Verapaz">Alta Verapaz</option>
                    <option value="Petén">Petén</option>
                    <option value="Izabal">Izabal</option>
                    <option value="Zacapa">Zacapa</option>
                    <option value="El Progreso">El Progreso</option>
                    <option value="Chiquimula">Chiquimula</option>
                    <option value="Jalapa">Jalapa</option>
                    <option value="Jutiapa">Jutiapa</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="codigoPostal">Código Postal *</label>
                  <input
                    type="text"
                    id="codigoPostal"
                    name="codigoPostal"
                    value={formData.codigoPostal}
                    onChange={handleChange}
                    maxLength="5"
                    required
                  />
                </div>
                <div className="form-group full-width">
                  <label htmlFor="instrucciones">Instrucciones de entrega (opcional)</label>
                  <textarea
                    id="instrucciones"
                    name="instrucciones"
                    value={formData.instrucciones}
                    onChange={handleChange}
                    placeholder="Referencias, horarios preferidos, etc."
                    rows="3"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="form-section">
              <h2>Método de Pago</h2>
              <div className="payment-methods">
                <label className={`payment-option ${formData.metodoPago === 'tarjeta' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="metodoPago"
                    value="tarjeta"
                    checked={formData.metodoPago === 'tarjeta'}
                    onChange={handleChange}
                  />
                  <span className="payment-icon">💳</span>
                  <span>Tarjeta de Crédito/Débito</span>
                </label>
                <label className={`payment-option ${formData.metodoPago === 'transferencia' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="metodoPago"
                    value="transferencia"
                    checked={formData.metodoPago === 'transferencia'}
                    onChange={handleChange}
                  />
                  <span className="payment-icon">🏦</span>
                  <span>Transferencia Bancaria</span>
                </label>
                <label className={`payment-option ${formData.metodoPago === 'paypal' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="metodoPago"
                    value="paypal"
                    checked={formData.metodoPago === 'paypal'}
                    onChange={handleChange}
                  />
                  <span className="payment-icon">💵</span>
                  <span>PayPal</span>
                </label>
              </div>

              {formData.metodoPago === 'tarjeta' && (
                <div className="card-details">
                  <div className="form-grid">
                    <div className="form-group full-width">
                      <label htmlFor="nombreTarjeta">Nombre en la tarjeta *</label>
                      <input
                        type="text"
                        id="nombreTarjeta"
                        name="nombreTarjeta"
                        value={formData.nombreTarjeta}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group full-width">
                      <label htmlFor="numeroTarjeta">Número de tarjeta *</label>
                      <input
                        type="text"
                        id="numeroTarjeta"
                        name="numeroTarjeta"
                        value={formData.numeroTarjeta}
                        onChange={handleChange}
                        placeholder="1234 5678 9012 3456"
                        maxLength="19"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="expiracion">Fecha de expiración *</label>
                      <input
                        type="text"
                        id="expiracion"
                        name="expiracion"
                        value={formData.expiracion}
                        onChange={handleChange}
                        placeholder="MM/AA"
                        maxLength="5"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="cvv">CVV *</label>
                      <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleChange}
                        maxLength="4"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {formData.metodoPago === 'transferencia' && (
                <div className="transfer-info">
                  <p>Al confirmar tu pedido, recibirás los datos bancarios para realizar la transferencia.</p>
                  <p>Tu pedido será procesado una vez confirmemos el pago.</p>
                </div>
              )}

              {formData.metodoPago === 'paypal' && (
                <div className="paypal-info">
                  <p>Serás redirigido a PayPal para completar tu pago de forma segura.</p>
                </div>
              )}
            </div>
          )}

          {step === 4 && (
            <div className="form-section">
              <h2>Confirmar Pedido</h2>

              <div className="confirm-section">
                <h3>Datos de contacto</h3>
                <p>{formData.nombre} {formData.apellido}</p>
                <p>{formData.email}</p>
                <p>{formData.telefono}</p>
              </div>

              <div className="confirm-section">
                <h3>Dirección de envío</h3>
                <p>{formData.direccion}</p>
                <p>{formData.ciudad}, {formData.estado} {formData.codigoPostal}</p>
                {formData.instrucciones && <p><em>{formData.instrucciones}</em></p>}
              </div>

              <div className="confirm-section">
                <h3>Método de pago</h3>
                <p>
                  {formData.metodoPago === 'tarjeta' && `💳 Tarjeta terminada en ${formData.numeroTarjeta.slice(-4)}`}
                  {formData.metodoPago === 'transferencia' && '🏦 Transferencia Bancaria'}
                  {formData.metodoPago === 'paypal' && '💵 PayPal'}
                </p>
              </div>

              <div className="confirm-section">
                <h3>Productos ({cartItems.length})</h3>
                {cartItems.map(item => (
                  <div key={item.id} className="confirm-item">
                    <span>{item.nombre} x{item.quantity}</span>
                    <span>Q{(item.precio * item.quantity).toLocaleString('es-GT')}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="form-actions">
            {step > 1 && (
              <button type="button" className="btn btn-secondary" onClick={prevStep}>
                ← Anterior
              </button>
            )}
            {step < 4 ? (
              <button
                type="button"
                className="btn btn-primary"
                onClick={nextStep}
                disabled={!validateStep()}
              >
                Siguiente →
              </button>
            ) : (
              <button type="submit" className="btn btn-primary">
                Confirmar Pedido
              </button>
            )}
          </div>
        </form>

        <aside className="order-summary">
          <h2>Resumen</h2>
          <div className="summary-items">
            {cartItems.map(item => (
              <div key={item.id} className="summary-item">
                <img src={item.imagen} alt={item.nombre} />
                <div className="summary-item-info">
                  <span className="item-name">{item.nombre}</span>
                  <span className="item-qty">Cantidad: {item.quantity}</span>
                </div>
                <span className="item-total">Q{(item.precio * item.quantity).toLocaleString('es-GT')}</span>
              </div>
            ))}
          </div>

          <div className="summary-totals">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>Q{cartTotal.toLocaleString('es-GT')}</span>
            </div>
            <div className="summary-row">
              <span>Envío</span>
              <span>{shippingCost === 0 ? 'Gratis' : `Q${shippingCost}`}</span>
            </div>
            {cartTotal < 800 && (
              <p className="free-shipping-note">
                Agrega Q{(800 - cartTotal).toLocaleString('es-GT')} más para envío gratis
              </p>
            )}
            <div className="summary-total">
              <span>Total</span>
              <span>Q{total.toLocaleString('es-GT')}</span>
            </div>
          </div>

          {hasEncargo && (
            <p className="encargo-note">
              Las piezas por encargo se confirman con fecha estimada de entrega. Te enviaremos la notificación al correo.
            </p>
          )}
        </aside>
      </div>
    </div>
  );
}
