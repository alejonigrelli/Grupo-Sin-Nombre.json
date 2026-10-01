function ProductCard({ producto, onVerDetalle, onAgregarCarrito }) {
  return (
    <article className="producto-card">
      <img
        src={`/${producto.imagen}`}
        alt={producto.nombre}
        className="producto-card__imagen"
        loading="lazy"
      />
      <div className="producto-card__info">
        <h3 className="producto-card__nombre">{producto.nombre}</h3>
        <p className="producto-card__precio">${producto.precio.toLocaleString('es-AR')}</p>
        <div className="producto-card__acciones">
          <a
            href="#"
            className="producto-card__link"
            onClick={(e) => { e.preventDefault(); onVerDetalle(producto); }}
          >
            Ver detalle
          </a>
          <button
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
