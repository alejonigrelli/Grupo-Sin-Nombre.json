function ProductDetail({ producto, onVolver, onAgregarCarrito }) {
  if (!producto) return null;

  // Construcción dinámica de especificaciones técnicas
  const especificaciones = producto.especificaciones
    ? Object.entries(producto.especificaciones)
    : [];

  return (
    <section className="detalle">
      <div className="container">
        <div className="detalle__contenido">
          <img
            src={`/${producto.imagen}`}
            alt={producto.nombre}
            className="detalle__imagen"
          />
          <div className="detalle__info">
            <h1 className="detalle__nombre">{producto.nombre}</h1>
            <p className="detalle__descripcion">{producto.descripcion}</p>
            {especificaciones.map(([clave, valor]) => (
              <p key={clave} className="detalle__dato">
                <strong>{clave}:</strong> {valor}
              </p>
            ))}
            <p className="detalle__precio">${producto.precio.toLocaleString('es-AR')}</p>
            <button
              className="detalle__boton"
              onClick={() => onAgregarCarrito(producto)}
            >
              Añadir al Carrito
            </button>
            <button
              className="detalle__boton detalle__boton--volver"
              onClick={onVolver}
            >
              Volver al catálogo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetail;
