import { useState } from 'react';
import './Contacto.css';

export default function Contacto() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    asunto: '',
    mensaje: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simular envío
    setSubmitted(true);
  };

  const contactInfo = [
    {
      icon: '📧',
      title: 'Email',
      content: 'info@artesaniasgt.com',
      link: 'mailto:info@artesaniasgt.com'
    },
    {
      icon: '📱',
      title: 'Teléfono',
      content: '+502 2222-3333',
      link: 'tel:+50222223333'
    },
    {
      icon: '💬',
      title: 'WhatsApp',
      content: '+502 5555-4321',
      link: 'https://wa.me/50255554321'
    },
    {
      icon: '📍',
      title: 'Ubicación',
      content: 'Ciudad de Guatemala, Guatemala',
      link: null
    }
  ];

  const faqs = [
    {
      question: '¿Cuánto tarda en llegar mi pedido?',
      answer: 'Ciudad de Guatemala: 1-3 días hábiles. Cabeceras departamentales: 3-5 días. Resto del país: 5-8 días. Áreas rurales: 8-12 días.'
    },
    {
      question: '¿Puedo personalizar una pieza?',
      answer: 'Sí, muchos de nuestros artesanos ofrecen productos por encargo. Contáctanos para discutir tu idea.'
    },
    {
      question: '¿Las piezas son auténticas?',
      answer: 'Absolutamente. Trabajamos directamente con artesanos y comunidades de todo Guatemala. Cada pieza viene con información sobre su origen.'
    },
    {
      question: '¿Realizan envíos internacionales?',
      answer: 'Por ahora solo enviamos dentro de Guatemala. La internacionalización está fuera del alcance de esta fase piloto.'
    }
  ];

  return (
    <div className="contacto-page">
      <div className="contacto-header">
        <h1>Contáctanos</h1>
        <p>Estamos aquí para ayudarte</p>
      </div>

      <div className="contacto-container">
        <div className="contact-info-section">
          <h2>Información de Contacto</h2>
          <div className="contact-cards">
            {contactInfo.map((info, index) => (
              <div key={index} className="contact-card">
                <span className="contact-icon">{info.icon}</span>
                <h3>{info.title}</h3>
                {info.link ? (
                  <a href={info.link}>{info.content}</a>
                ) : (
                  <p>{info.content}</p>
                )}
              </div>
            ))}
          </div>

          <div className="horario-section">
            <h3>Horario de Atención</h3>
            <ul>
              <li><span>Lunes - Viernes:</span> 9:00 - 18:00</li>
              <li><span>Sábados:</span> 10:00 - 14:00</li>
              <li><span>Domingos:</span> Cerrado</li>
            </ul>
            <p className="response-sla">Tiempo de respuesta estimado: 24-48 horas hábiles.</p>
          </div>

          <div className="social-section">
            <h3>Síguenos</h3>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Facebook">📘 Facebook</a>
              <a href="#" className="social-link" aria-label="Instagram">📸 Instagram</a>
              <a href="#" className="social-link" aria-label="Pinterest">📌 Pinterest</a>
            </div>
          </div>
        </div>

        <div className="contact-form-section">
          {submitted ? (
            <div className="form-success">
              <span className="success-icon">✓</span>
              <h2>¡Mensaje Enviado!</h2>
              <p>Gracias por contactarnos. Te responderemos lo antes posible.</p>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    nombre: '',
                    email: '',
                    telefono: '',
                    asunto: '',
                    mensaje: ''
                  });
                }}
              >
                Enviar otro mensaje
              </button>
            </div>
          ) : (
            <>
              <h2>Envíanos un Mensaje</h2>
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="nombre">Nombre completo *</label>
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
                    <label htmlFor="email">Correo electrónico *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="telefono">Teléfono</label>
                    <input
                      type="tel"
                      id="telefono"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      placeholder="Opcional"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="asunto">Asunto *</label>
                    <select
                      id="asunto"
                      name="asunto"
                      value={formData.asunto}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Selecciona un asunto</option>
                      <option value="consulta">Consulta general</option>
                      <option value="pedido">Sobre mi pedido</option>
                      <option value="producto">Información de producto</option>
                      <option value="personalizado">Pedido personalizado</option>
                      <option value="mayoreo">Ventas al mayoreo</option>
                      <option value="colaboracion">Colaboración</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="mensaje">Mensaje *</label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleChange}
                    rows="5"
                    placeholder="Escribe tu mensaje aquí..."
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary submit-btn">
                  Enviar Mensaje
                </button>
              </form>
            </>
          )}
        </div>
      </div>

      <section className="faq-section">
        <div className="container">
          <h2>Preguntas Frecuentes</h2>
          <div className="faq-grid">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
