import ProductCard from './ProductCard';

function ProductList({ productos, cargando, error, onVerDetalle, onAgregarCarrito }) {
  if (cargando) {
    return (
      <section className="seccion">
        <div className="container">
          <p>Cargando productos...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="seccion">
        <div className="container">
          <p className="estado-error">Error: {error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="seccion">
      <div className="container">
        <h2 className="seccion__titulo">Nuestros Productos</h2>
        <div className="productos-grilla">
          {productos.map(producto => (
            <ProductCard
              key={producto.id}
              producto={producto}
              onVerDetalle={onVerDetalle}
              onAgregarCarrito={onAgregarCarrito}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductList;