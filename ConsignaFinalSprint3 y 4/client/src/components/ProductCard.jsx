import React from 'react';

function ProductCard({ producto, onVerDetalle }) {
  return (
    <div className="producto-card">
      <img 
        src={`http://localhost:5000/${producto.imagen}`} 
        alt={producto.nombre} 
        className="producto-card__imagen"
      />
      <div className="producto-card__info">
        <h3 className="producto-card__nombre">{producto.nombre}</h3>
        <p className="producto-card__precio">
          ${producto.precio.toLocaleString('es-AR')}
        </p>
        <button 
          onClick={() => onVerDetalle && onVerDetalle(producto)}
          className="producto-card__link"
        >
          Ver detalle
        </button>
      </div>
    </div>
  );
}

export default ProductCard;