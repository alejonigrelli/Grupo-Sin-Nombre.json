import React from 'react';
import { Link } from 'react-router-dom';

function ProductCard({ producto, onAgregarCarrito }) {
  const id = producto._id || producto.id;
  const imagen = producto.imagenUrl || producto.imagen;

  return (
    <article className="producto-card">
      <img
        src={imagen ? (imagen.startsWith('http') || imagen.startsWith('/') ? imagen : `/${imagen}`) : '/img/productos/placeholder.png'}
        alt={producto.nombre}
        className="producto-card__imagen"
        loading="lazy"
      />
      <div className="producto-card__info">
        <h3 className="producto-card__nombre">{producto.nombre}</h3>
        <p className="producto-card__precio">${Number(producto.precio).toLocaleString('es-AR')}</p>
        <div className="producto-card__acciones">
          <Link
            to={`/productos/${id}`}
            className="producto-card__link"
          >
            Ver detalle
          </Link>
          <button
            type="button"
            className="producto-card__link producto-card__link--carrito"
            onClick={() => onAgregarCarrito(producto)}
          >
            Añadir al Carrito
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
