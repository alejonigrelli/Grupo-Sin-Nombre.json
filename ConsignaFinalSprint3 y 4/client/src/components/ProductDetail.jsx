import React from 'react';

function ProductDetail({ producto, onVolver }) {
  if (!producto) return null;

  return (
    <main className="container">
      <section className="detalle">
        <div className="detalle__contenido">
          <img 
            src={`http://localhost:5000/${producto.imagen}`} 
            alt={producto.nombre} 
            className="detalle__imagen"
          />
          <div className="detalle__info">
            <h2 className="detalle__nombre">{producto.nombre}</h2>
            <p className="detalle__descripcion">{producto.descripcion}</p>
            <p className="detalle__dato"><strong>Categoría:</strong> {producto.categoria}</p>
            <p className="detalle__precio">${producto.precio.toLocaleString('es-AR')}</p>
            
            <button onClick={onVolver} className="detalle__boton">
              Volver al catálogo
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ProductDetail;