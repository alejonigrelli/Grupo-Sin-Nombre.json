import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ProductDetail({ onAgregarCarrito }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setCargando(true);
    setError(null);

    fetch(`http://localhost:5000/api/productos/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Producto no encontrado');
        }
        return res.json();
      })
      .then((data) => {
        setProducto(data);
        setCargando(false);
      })
      .catch((err) => {
        setError(err.message);
        setCargando(false);
      });
  }, [id]);

  if (cargando) {
    return (
      <section className="detalle">
        <div className="container">
          <p>Cargando información del producto...</p>
        </div>
      </section>
    );
  }

  if (error || !producto) {
    return (
      <section className="detalle">
        <div className="container" style={{ textAlign: 'center', padding: '3rem 1rem' }}>
          <h2 className="seccion__titulo">Producto no encontrado</h2>
          <p className="estado-error">{error || 'El producto solicitado no existe.'}</p>
          <div style={{ marginTop: '1.5rem' }}>
            <button
              type="button"
              className="detalle__boton"
              onClick={() => navigate('/productos')}
            >
              Volver al catálogo
            </button>
          </div>
        </div>
      </section>
    );
  }

  const imagen = producto.imagenUrl || producto.imagen;
  const especificaciones = producto.especificaciones
    ? Object.entries(producto.especificaciones)
    : [];

  return (
    <section className="detalle">
      <div className="container">
        <div className="detalle__contenido">
          <img
            src={
              imagen
                ? imagen.startsWith('http') || imagen.startsWith('/')
                  ? imagen
                  : `/${imagen}`
                : '/img/productos/placeholder.png'
            }
            alt={producto.nombre}
            className="detalle__imagen"
          />
          <div className="detalle__info">
            <h1 className="detalle__nombre">{producto.nombre}</h1>
            <p className="detalle__descripcion">{producto.descripcion}</p>

            {producto.stock !== undefined && (
              <p className="detalle__dato">
                <strong>Stock disponible:</strong>{' '}
                {producto.stock > 0 ? `${producto.stock} unidades` : 'Sin stock'}
              </p>
            )}

            {especificaciones.map(([clave, valor]) => (
              <p key={clave} className="detalle__dato">
                <strong>{clave}:</strong> {valor}
              </p>
            ))}

            <p className="detalle__precio">
              ${Number(producto.precio).toLocaleString('es-AR')}
            </p>

            <button
              type="button"
              className="detalle__boton"
              onClick={() => onAgregarCarrito(producto)}
            >
              Añadir al Carrito
            </button>

            <button
              type="button"
              className="detalle__boton detalle__boton--volver"
              onClick={() => navigate('/productos')}
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
