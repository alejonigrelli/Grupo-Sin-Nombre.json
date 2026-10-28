import React from 'react';
import ProductCard from './ProductCard';

function ProductList({ productos, cargando, error, onAgregarCarrito }) {
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
        {productos.length === 0 ? (
          <p style={{ textAlign: 'center' }}>No hay productos disponibles por el momento.</p>
        ) : (
          <div className="productos-grilla">
            {productos.map(producto => (
              <ProductCard
                key={producto._id || producto.id}
                producto={producto}
                onAgregarCarrito={onAgregarCarrito}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default ProductList;
