import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Politicas.css';

export default function Politicas() {
  const [activeSection, setActiveSection] = useState('envios');

  const sections = [
    { id: 'envios', title: 'Envíos' },
    { id: 'devoluciones', title: 'Devoluciones' },
    { id: 'pagos', title: 'Pagos' },
    { id: 'garantia', title: 'Garantía' },
    { id: 'privacidad', title: 'Privacidad' }
  ];

  return (
    <div className="politicas-page">
      <div className="politicas-header">
        <h1>Políticas de la Tienda</h1>
        <p>Todo lo que necesitas saber sobre envíos, devoluciones y más</p>
      </div>

      <div className="politicas-container">
        <nav className="politicas-nav">
          {sections.map(section => (
            <button
              key={section.id}
              className={`nav-btn ${activeSection === section.id ? 'active' : ''}`}
              onClick={() => setActiveSection(section.id)}
            >
              {section.title}
            </button>
          ))}
        </nav>

        <div className="politicas-content">
          {activeSection === 'envios' && (
            <section className="policy-section">
              <h2>Política de Envíos</h2>

              <h3>Cobertura</h3>
              <p>Realizamos envíos a todo Guatemala. En esta fase piloto el alcance es exclusivamente nacional.</p>

              <h3>Tiempos de Entrega</h3>
              <ul>
                <li><strong>Ciudad de Guatemala y área metropolitana:</strong> 1-3 días hábiles</li>
                <li><strong>Cabeceras departamentales:</strong> 3-5 días hábiles</li>
                <li><strong>Resto del país:</strong> 5-8 días hábiles</li>
                <li><strong>Áreas rurales/extendidas:</strong> 8-12 días hábiles</li>
              </ul>

              <h3>Costos de Envío</h3>
              <div className="info-box">
                <p><strong>Envío GRATIS</strong> en compras mayores a Q800</p>
              </div>
              <ul>
                <li>Ciudad de Guatemala: Q25</li>
                <li>Envío estándar nacional: Q45</li>
                <li>Envío express: Q75 (entrega en 24-48 hrs en principales ciudades)</li>
              </ul>

              <h3>Embalaje</h3>
              <p>Todas nuestras piezas se embalan cuidadosamente con materiales de protección adecuados para cada tipo de artesanía. Las piezas frágiles (cerámica, vidrio) reciben protección especial.</p>

              <h3>Seguimiento</h3>
              <p>Una vez que tu pedido sea enviado, recibirás un correo con el número de guía para rastrear tu paquete en tiempo real.</p>

              <h3>Productos Por Encargo</h3>
              <p>Los productos elaborados por encargo tienen tiempos de elaboración adicionales (indicados en cada producto) antes del envío. Te mantendremos informado sobre el progreso de tu pieza.</p>
            </section>
          )}

          {activeSection === 'devoluciones' && (
            <section className="policy-section">
              <h2>Política de Devoluciones</h2>

              <h3>Plazo para Devoluciones</h3>
              <p>Tienes <strong>14 días naturales</strong> a partir de la recepción del producto para solicitar una devolución.</p>

              <h3>Condiciones</h3>
              <ul>
                <li>El producto debe estar en su empaque original</li>
                <li>No debe mostrar señales de uso</li>
                <li>Debe incluir todos los accesorios y documentación</li>
                <li>Debes conservar el comprobante de compra</li>
              </ul>

              <h3>Productos No Retornables</h3>
              <div className="warning-box">
                <p>Los siguientes productos <strong>NO</strong> son elegibles para devolución:</p>
                <ul>
                  <li>Productos elaborados por encargo o personalizados</li>
                  <li>Piezas de edición limitada (salvo defectos)</li>
                  <li>Productos con daños causados por mal uso</li>
                  <li>Joyería que haya sido usada</li>
                </ul>
              </div>

              <h3>Proceso de Devolución</h3>
              <ol>
                <li>Contáctanos a devoluciones@artesaniasgt.com</li>
                <li>Indica tu número de pedido y motivo de devolución</li>
                <li>Recibirás instrucciones y una guía de envío prepagada</li>
                <li>Empaca el producto de forma segura</li>
                <li>Una vez recibido e inspeccionado, procesaremos tu reembolso</li>
              </ol>

              <h3>Reembolsos</h3>
              <p>Los reembolsos se procesan en un plazo de 5-10 días hábiles tras recibir y verificar el producto. Se realizará a través del mismo método de pago original.</p>
            </section>
          )}

          {activeSection === 'pagos' && (
            <section className="policy-section">
              <h2>Métodos de Pago</h2>

              <h3>Formas de Pago Aceptadas</h3>
              <div className="payment-methods">
                <div className="payment-method">
                  <h4>Tarjetas de Crédito/Débito</h4>
                  <p>Visa, Mastercard</p>
                </div>
                <div className="payment-method">
                  <h4>Transferencia Bancaria</h4>
                  <p>Bancos del sistema guatemalteco</p>
                </div>
                <div className="payment-method">
                  <h4>Depósito Bancario</h4>
                  <p>BAM, Banrural, G&T Continental</p>
                </div>
              </div>

              <h3>Seguridad</h3>
              <p>Todas las transacciones están protegidas con encriptación SSL de 256 bits. No almacenamos datos sensibles de tarjetas en nuestros servidores.</p>

              <h3>Facturación</h3>
              <p>Si requieres factura, solicítala al momento de realizar tu compra proporcionando tu NIT. Las facturas se emiten dentro de las 72 horas posteriores a la compra.</p>

              <h3>Pagos en Cuotas</h3>
              <p>Disponible en compras mayores a Q500 con tarjetas participantes:</p>
              <ul>
                <li>3 cuotas sin intereses</li>
                <li>6 cuotas sin intereses (compras mayores a Q1,500)</li>
              </ul>
            </section>
          )}

          {activeSection === 'garantia' && (
            <section className="policy-section">
              <h2>Garantía de Calidad</h2>

              <h3>Nuestra Garantía</h3>
              <p>Todas nuestras artesanías pasan por un proceso de control de calidad antes de ser enviadas. Garantizamos que cada pieza:</p>
              <ul>
                <li>Es auténtica y elaborada por artesanos guatemaltecos</li>
                <li>Corresponde a la descripción y fotografías</li>
                <li>Está libre de defectos de fabricación</li>
              </ul>

              <h3>Cobertura</h3>
              <p>La garantía cubre defectos de fabricación por un período de <strong>30 días</strong> a partir de la entrega.</p>

              <h3>¿Qué NO Cubre la Garantía?</h3>
              <ul>
                <li>Daños causados por mal uso o accidentes</li>
                <li>Desgaste natural por uso</li>
                <li>Modificaciones o reparaciones no autorizadas</li>
                <li>Daños por condiciones ambientales extremas</li>
              </ul>

              <h3>Naturaleza de las Artesanías</h3>
              <div className="info-box">
                <p>Cada pieza artesanal es única. Pequeñas variaciones en color, textura o dimensiones son características normales del trabajo hecho a mano y no se consideran defectos.</p>
              </div>

              <h3>Reclamaciones</h3>
              <p>Para hacer válida la garantía, contáctanos a garantia@artesaniasgt.com con fotos del producto y descripción del problema.</p>
            </section>
          )}

          {activeSection === 'privacidad' && (
            <section className="policy-section">
              <h2>Política de Privacidad</h2>

              <h3>Información que Recopilamos</h3>
              <ul>
                <li>Datos de contacto (nombre, email, teléfono)</li>
                <li>Dirección de envío</li>
                <li>Historial de compras</li>
                <li>Preferencias de navegación (cookies)</li>
              </ul>

              <h3>Uso de la Información</h3>
              <p>Utilizamos tus datos para:</p>
              <ul>
                <li>Procesar y enviar tus pedidos</li>
                <li>Comunicarnos contigo sobre tu compra</li>
                <li>Enviarte información sobre promociones (si lo autorizas)</li>
                <li>Mejorar nuestros servicios</li>
              </ul>

              <h3>Protección de Datos</h3>
              <p>Implementamos medidas de seguridad técnicas y organizativas para proteger tu información personal contra accesos no autorizados.</p>

              <h3>Tus Derechos</h3>
              <p>Tienes derecho a:</p>
              <ul>
                <li>Acceder a tus datos personales</li>
                <li>Rectificar información incorrecta</li>
                <li>Solicitar la eliminación de tus datos</li>
                <li>Oponerte al uso de tus datos para marketing</li>
              </ul>

              <h3>Cookies</h3>
              <p>Utilizamos cookies para mejorar tu experiencia de navegación. Puedes configurar tu navegador para rechazarlas, aunque algunas funciones del sitio podrían verse afectadas.</p>

              <h3>Contacto</h3>
              <p>Para cualquier consulta sobre privacidad: privacidad@artesaniasgt.com</p>
            </section>
          )}
        </div>
      </div>

      <div className="politicas-cta">
        <h3>¿Tienes más preguntas?</h3>
        <p>Nuestro equipo está listo para ayudarte</p>
        <Link to="/contacto" className="btn btn-primary">Contáctanos</Link>
      </div>
    </div>
  );
}
