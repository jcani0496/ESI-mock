import { Link } from 'react-router-dom';
import './Nosotros.css';

export default function Nosotros() {
  const valores = [
    {
      titulo: 'Comercio Justo',
      descripcion: 'Pagamos precios justos a nuestros artesanos, garantizando que su trabajo sea valorado dignamente.'
    },
    {
      titulo: 'Sostenibilidad',
      descripcion: 'Promovemos el uso de materiales naturales y técnicas tradicionales que respetan el medio ambiente.'
    },
    {
      titulo: 'Autenticidad',
      descripcion: 'Cada pieza es genuina, elaborada siguiendo técnicas ancestrales transmitidas por generaciones.'
    },
    {
      titulo: 'Empoderamiento',
      descripcion: 'Apoyamos a comunidades rurales e indígenas, especialmente a mujeres artesanas.'
    }
  ];

  const comunidades = [
    { nombre: 'San Juan La Laguna', departamento: 'Sololá', artesania: 'Textiles y tule' },
    { nombre: 'Chinautla', departamento: 'Guatemala', artesania: 'Cerámica tradicional' },
    { nombre: 'Chichicastenango', departamento: 'Quiché', artesania: 'Máscaras y textiles' },
    { nombre: 'Momostenango', departamento: 'Totonicapán', artesania: 'Alfombras de lana' },
    { nombre: 'Antigua Guatemala', departamento: 'Sacatepéquez', artesania: 'Cerámica mayólica' },
    { nombre: 'Quetzaltenango', departamento: 'Quetzaltenango', artesania: 'Cortes y marimbas' }
  ];

  return (
    <div className="nosotros-page">
      {/* Sección principal */}
      <section className="nosotros-hero">
        <div className="hero-overlay">
          <h1>Nuestra Historia</h1>
          <p>Conectamos tradiciones ancestrales con el mundo moderno</p>
        </div>
      </section>

      {/* Historia */}
      <section className="historia-section">
        <div className="container">
          <div className="historia-content">
            <div className="historia-text">
              <h2>El Origen de Artesanías GT</h2>
              <p>
                Artesanías GT nació de un profundo amor por las tradiciones guatemaltecas y un deseo de
                preservar el invaluable patrimonio cultural de nuestro país. Fundada por un grupo de
                entusiastas del arte popular, nuestra misión es crear un puente entre las comunidades
                artesanales y personas que valoran la autenticidad y la belleza del trabajo hecho a mano.
              </p>
              <p>
                Recorremos los rincones más remotos de Guatemala, visitando talleres familiares donde las
                técnicas se transmiten de generación en generación. Cada visita nos permite conocer no
                solo el proceso creativo, sino las historias, sueños y tradiciones de quienes dan vida
                a estas obras de arte.
              </p>
              <p>
                Nuestro portafolio curado incluye piezas de más de 40 comunidades artesanales en 12
                departamentos de Guatemala. Desde la cerámica de Chinautla hasta las alfombras de
                Momostenango, cada producto cuenta una historia única.
              </p>
            </div>
            <div className="historia-image">
              <img
                src="https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=600&auto=format&fit=crop&fm=webp"
                alt="Artesano guatemalteco trabajando"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Misión y Visión */}
      <section className="mision-section">
        <div className="container">
          <div className="mision-grid">
            <div className="mision-card">
              <h3>Misión</h3>
              <p>
                Preservar y difundir las tradiciones artesanales guatemaltecas, creando oportunidades
                económicas justas para las comunidades productoras mientras acercamos sus creaciones
                únicas a personas que valoran la autenticidad y el trabajo manual.
              </p>
            </div>
            <div className="mision-card">
              <h3>Visión</h3>
              <p>
                Ser el puente más importante entre los artesanos guatemaltecos y el mundo, contribuyendo
                a que las nuevas generaciones continúen practicando y valorando estas expresiones
                culturales únicas de nuestra herencia maya.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="valores-section">
        <div className="container">
          <h2>Nuestros Valores</h2>
          <div className="valores-grid">
            {valores.map((valor, index) => (
              <div key={index} className="valor-card">
                <h3>{valor.titulo}</h3>
                <p>{valor.descripcion}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comunidades */}
      <section className="comunidades-section">
        <div className="container">
          <h2>Comunidades Artesanales</h2>
          <p className="comunidades-intro">
            Trabajamos directamente con familias y cooperativas en diversas regiones de Guatemala
          </p>
          <div className="comunidades-grid">
            {comunidades.map((com, index) => (
              <div key={index} className="comunidad-card">
                <h4>{com.nombre}</h4>
                <p className="departamento">{com.departamento}</p>
                <p className="artesania">{com.artesania}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impacto */}
      <section className="impacto-section">
        <div className="container">
          <h2>Nuestro Impacto</h2>
          <div className="stats-grid">
            <div className="stat">
              <span className="stat-number">40+</span>
              <span className="stat-label">Comunidades</span>
            </div>
            <div className="stat">
              <span className="stat-number">150+</span>
              <span className="stat-label">Artesanos</span>
            </div>
            <div className="stat">
              <span className="stat-number">12</span>
              <span className="stat-label">Departamentos</span>
            </div>
            <div className="stat">
              <span className="stat-number">800+</span>
              <span className="stat-label">Piezas vendidas</span>
            </div>
          </div>
        </div>
      </section>

      {/* Compromisos del piloto */}
      <section className="pilot-section">
        <div className="container">
          <h2>Compromisos del piloto</h2>
          <p className="pilot-intro">
            Estos son los indicadores objetivo que guían el lanzamiento controlado del canal online.
          </p>
          <div className="pilot-grid">
            <div className="pilot-card">
              <h3>Cumplimiento de entrega</h3>
              <p>90% de repetibles a tiempo y 85% de encargos dentro del rango comunicado.</p>
            </div>
            <div className="pilot-card">
              <h3>Calidad operativa</h3>
              <p>Devoluciones o reprocesos ≤ 5% con tendencia a la baja.</p>
            </div>
            <div className="pilot-card">
              <h3>Experiencia digital</h3>
              <p>Conversión ≥ 1.0% y reducción de abandono de carrito.</p>
            </div>
            <div className="pilot-card">
              <h3>Reputación</h3>
              <p>Calificación promedio ≥ 4.7/5 y reseñas verificadas crecientes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Llamado a la acción */}
      <section className="cta-section">
        <div className="container">
          <h2>¿Quieres conocer nuestras artesanías?</h2>
          <p>Cada pieza tiene una historia que contar</p>
          <Link to="/catalogo" className="btn btn-light">Explorar Catálogo</Link>
        </div>
      </section>
    </div>
  );
}
