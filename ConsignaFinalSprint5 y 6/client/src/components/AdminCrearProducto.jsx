import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminCrearProducto({ onProductoCreado }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
    imagenUrl: ''
  });

  const [errores, setErrores] = useState({});
  const [cargando, setCargando] = useState(false);
  const [errorServidor, setErrorServidor] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));

    if (errores[name]) {
      setErrores((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorServidor(null);

    // Validaciones
    const nuevosErrores = {};
    if (!form.nombre.trim()) {
      nuevosErrores.nombre = 'El nombre del producto es obligatorio.';
    }
    if (!form.precio || Number(form.precio) <= 0) {
      nuevosErrores.precio = 'El precio debe ser un número mayor a 0.';
    }

    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      return;
    }

    setCargando(true);

    try {
      const nuevoProducto = {
        nombre: form.nombre.trim(),
        descripcion: form.descripcion.trim(),
        precio: Number(form.precio),
        stock: form.stock !== '' ? Number(form.stock) : 0,
        imagenUrl: form.imagenUrl.trim()
      };

      const res = await fetch('http://localhost:5000/api/productos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevoProducto)
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.mensaje || 'Error al crear el producto');
      }

      const productoCreado = await res.json();

      if (onProductoCreado) {
        onProductoCreado(productoCreado);
      }

      // Redirigir al catálogo tras la creación exitosa
      navigate('/productos');
    } catch (err) {
      setErrorServidor(err.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <section className="contacto">
      <div className="container">
        <h1 className="seccion__titulo">Alta de Nuevo Producto</h1>
        <p style={{ textAlign: 'center', marginBottom: '2rem', color: '#6D4C41' }}>
          Completá el formulario para agregar un producto a la base de datos de MongoDB.
        </p>

        {errorServidor && (
          <div className="estado-error" style={{ maxWidth: '600px', margin: '0 auto 1.5rem auto' }}>
            {errorServidor}
          </div>
        )}

        <form className="contacto__formulario" onSubmit={handleSubmit}>
          <div className="contacto__grupo">
            <label className="contacto__label" htmlFor="nombre">
              Nombre del producto *
            </label>
            <input
              className="contacto__input"
              type="text"
              id="nombre"
              name="nombre"
              placeholder="Ej: Mesa de Roble Nórdica"
              value={form.nombre}
              onChange={handleChange}
              disabled={cargando}
            />
            {errores.nombre && <span className="contacto__error">{errores.nombre}</span>}
          </div>

          <div className="contacto__grupo">
            <label className="contacto__label" htmlFor="descripcion">
              Descripción
            </label>
            <textarea
              className="contacto__textarea"
              id="descripcion"
              name="descripcion"
              rows={4}
              placeholder="Descripción detallada de materiales, diseño y terminaciones..."
              value={form.descripcion}
              onChange={handleChange}
              disabled={cargando}
            />
          </div>

          <div className="contacto__grupo">
            <label className="contacto__label" htmlFor="precio">
              Precio ($ ARS) *
            </label>
            <input
              className="contacto__input"
              type="number"
              id="precio"
              name="precio"
              placeholder="Ej: 185000"
              value={form.precio}
              onChange={handleChange}
              disabled={cargando}
              min="0"
              step="any"
            />
            {errores.precio && <span className="contacto__error">{errores.precio}</span>}
          </div>

          <div className="contacto__grupo">
            <label className="contacto__label" htmlFor="stock">
              Stock disponible
            </label>
            <input
              className="contacto__input"
              type="number"
              id="stock"
              name="stock"
              placeholder="Ej: 15"
              value={form.stock}
              onChange={handleChange}
              disabled={cargando}
              min="0"
            />
          </div>

          <div className="contacto__grupo">
            <label className="contacto__label" htmlFor="imagenUrl">
              URL de la imagen
            </label>
            <input
              className="contacto__input"
              type="text"
              id="imagenUrl"
              name="imagenUrl"
              placeholder="img/productos/MesaComedorPampa.png o URL externa"
              value={form.imagenUrl}
              onChange={handleChange}
              disabled={cargando}
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button
              className="contacto__boton"
              type="submit"
              disabled={cargando}
              style={{ flex: 1 }}
            >
              {cargando ? 'Guardando...' : 'Crear Producto'}
            </button>
            <button
              type="button"
              className="detalle__boton detalle__boton--volver"
              onClick={() => navigate('/productos')}
              disabled={cargando}
              style={{ flex: 1 }}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default AdminCrearProducto;
