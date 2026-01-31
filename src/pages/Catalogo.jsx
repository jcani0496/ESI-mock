import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import productos from '../data/productos.json';
import './Catalogo.css';

export default function Catalogo() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');

  const categoriaParam = searchParams.get('categoria') || '';
  const tipoParam = searchParams.get('tipo') || '';

  const categorias = [...new Set(productos.map(p => p.categoria))];
  const categoriaLabels = {
    ceramica: 'Cerámica',
    textil: 'Textiles',
    madera: 'Madera',
    joyeria: 'Joyería',
    piedra: 'Piedra',
    fibras: 'Fibras',
    papel: 'Papel'
  };
  const tipos = [
    { id: 'repetible', nombre: 'Repetible' },
    { id: 'edicion_limitada', nombre: 'Edición Limitada' },
    { id: 'por_encargo', nombre: 'Por Encargo' }
  ];

  const productosFiltrados = useMemo(() => {
    return productos.filter(p => {
      const matchCategoria = !categoriaParam || p.categoria === categoriaParam;
      const matchTipo = !tipoParam || p.tipo === tipoParam;
      const matchSearch = !searchTerm ||
        p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.artesano.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCategoria && matchTipo && matchSearch;
    });
  }, [categoriaParam, tipoParam, searchTerm]);

  const handleCategoriaChange = (categoria) => {
    const newParams = new URLSearchParams(searchParams);
    if (categoria) {
      newParams.set('categoria', categoria);
    } else {
      newParams.delete('categoria');
    }
    setSearchParams(newParams);
  };

  const handleTipoChange = (tipo) => {
    const newParams = new URLSearchParams(searchParams);
    if (tipo) {
      newParams.set('tipo', tipo);
    } else {
      newParams.delete('tipo');
    }
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setSearchParams({});
    setSearchTerm('');
  };

  return (
    <div className="catalogo">
      <div className="catalogo-header">
        <h1>Catálogo de Artesanías</h1>
        <p>Explora nuestra colección de piezas únicas hechas a mano</p>
      </div>

      <div className="catalogo-container">
        <aside className="filters-sidebar">
          <div className="search-box">
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filter-group">
            <h3>Categoría</h3>
            <div className="filter-options">
              <button
                className={`filter-btn ${!categoriaParam ? 'active' : ''}`}
                onClick={() => handleCategoriaChange('')}
              >
                Todas
              </button>
              {categorias.map(cat => (
                <button
                  key={cat}
                  className={`filter-btn ${categoriaParam === cat ? 'active' : ''}`}
                  onClick={() => handleCategoriaChange(cat)}
                >
                  {categoriaLabels[cat] || (cat.charAt(0).toUpperCase() + cat.slice(1))}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <h3>Tipo de Producto</h3>
            <div className="filter-options">
              <button
                className={`filter-btn ${!tipoParam ? 'active' : ''}`}
                onClick={() => handleTipoChange('')}
              >
                Todos
              </button>
              {tipos.map(tipo => (
                <button
                  key={tipo.id}
                  className={`filter-btn ${tipoParam === tipo.id ? 'active' : ''}`}
                  onClick={() => handleTipoChange(tipo.id)}
                >
                  {tipo.nombre}
                </button>
              ))}
            </div>
          </div>

          {(categoriaParam || tipoParam || searchTerm) && (
            <button className="clear-filters" onClick={clearFilters}>
              Limpiar filtros
            </button>
          )}
        </aside>

        <main className="products-main">
          <div className="results-info">
            <span>{productosFiltrados.length} productos encontrados</span>
          </div>

          {productosFiltrados.length > 0 ? (
            <div className="products-grid">
              {productosFiltrados.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="no-results">
              <p>No se encontraron productos con los filtros seleccionados.</p>
              <button className="btn btn-primary" onClick={clearFilters}>
                Ver todos los productos
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
