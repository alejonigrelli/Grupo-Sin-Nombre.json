import React, { useState } from 'react';
import ProductCard from './ProductCard';

function ProductList({ productos = [], onVerDetalle }) {
  const [busqueda, setBusqueda] = useState('');

  // Nos aseguramos de que productos sea un array antes de filtrar
  const productosFiltrados = Array.isArray(productos) 
    ? productos.filter(p => p.nombre.toLowerCase().includes(busqueda.toLowerCase()))
    : [];

  return (
    <div className="container">
      <h2 className="seccion__titulo">Nuestros Productos</h2>
      
      <div className="buscador">
        <input 
          type="text" 
          placeholder="Buscar productos..." 
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="buscador__input"
        />
      </div>

      <div className="productos-grilla">
        {productosFiltrados.length > 0 ? (
          productosFiltrados.map(producto => (
            <ProductCard 
              key={producto.id || producto._id} 
              producto={producto} 
              onVerDetalle={onVerDetalle} 
            />
          ))
        ) : (
          <p className="vista-placeholder">Cargando productos o no se encontraron resultados...</p>
        )}
      </div>
    </div>
  );
}

export default ProductList;