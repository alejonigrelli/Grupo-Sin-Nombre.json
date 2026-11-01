/**
 * @archivo     AdminEditarProducto.jsx
 * @modulo      Administración de productos
 * @descripcion Formulario controlado para editar un producto existente (ruta /admin/editar-producto/:id).
 *              Carga el producto con GET, envía los cambios con PUT y redirige al detalle.
 *              No crea productos: eso lo hace AdminCrearProducto.
 * @dependencias API_URL (config.js), react-router-dom (useParams, useNavigate)
 * @version     1.0.0
 * @actualizado 2026-10-31
 */
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API_URL } from '../config';

function AdminEditarProducto({ onProductoActualizado }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
    imagenUrl: ''
  });

  const [errores, setErrores] = useState({});
  const [cargandoProducto, setCargandoProducto] = useState(true);
  const [errorCarga, setErrorCarga] = useState(null);
  const [guardando, setGuardando] = useState(false);
  const [errorServidor, setErrorServidor] = useState(null);

  // Cargar el producto actual para precompletar el formulario
  useEffect(() => {
    setCargandoProducto(true);
    setErrorCarga(null);

    fetch(`${API_URL}/api/productos/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Producto no encontrado');
        }
        return res.json();
      })
      .then((data) => {
        // Los inputs controlados necesitan strings: los números y campos vacíos se convierten acá
        setForm({
          nombre: data.nombre || '',
          descripcion: data.descripcion || '',
          precio: data.precio !== undefined ? String(data.precio) : '',
          stock: data.stock !== undefined ? String(data.stock) : '',
          imagenUrl: data.imagenUrl || ''
        });
        setCargandoProducto(false);
      })
      .catch((err) => {
        setErrorCarga(err.message);
        setCargandoProducto(false);
      });
  }, [id]);

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

    // Validaciones (mismas reglas que el alta de producto)
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

    setGuardando(true);

    try {
      // Solo se envían los campos del formulario: destacado y especificaciones quedan como estaban
      const cambios = {
        nombre: form.nombre.trim(),
        descripcion: form.descripcion.trim(),
        precio: Number(form.precio),
        stock: form.stock !== '' ? Number(form.stock) : 0,
        imagenUrl: form.imagenUrl.trim()
      };

      const res = await fetch(`${API_URL}/api/productos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(cambios)
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.mensaje || 'Error al actualizar el producto');
      }

      const productoActualizado = await res.json();

      if (onProductoActualizado) {
        onProductoActualizado(productoActualizado);
      }

      // Volver al detalle para ver los cambios aplicados
      navigate(`/productos/${id}`);
    } catch (err) {
      setErrorServidor(err.message);
    } finally {
      setGuardando(false);
    }
  };

  if (cargandoProducto) {
    return (
      <section className="contacto">
        <div className="container">
          <p>Cargando información del producto...</p>
        </div>
      </section>
    );
  }

  if (errorCarga) {
    return (
      <section className="contacto">
        <div className="container" style={{ textAlign: 'center', padding: '3rem 1rem' }}>
          <h2 className="seccion__titulo">Producto no encontrado</h2>
          <p className="estado-error">{errorCarga}</p>
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

  return (
    <section className="contacto">
      <div className="container">
        <h1 className="seccion__titulo">Editar Producto</h1>
        <p style={{ textAlign: 'center', marginBottom: '2rem', color: '#6D4C41' }}>
          Modificá los datos y guardá para actualizar el producto en MongoDB.
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
              value={form.nombre}
              onChange={handleChange}
              disabled={guardando}
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
              value={form.descripcion}
              onChange={handleChange}
              disabled={guardando}
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
              value={form.precio}
              onChange={handleChange}
              disabled={guardando}
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
              value={form.stock}
              onChange={handleChange}
              disabled={guardando}
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
              disabled={guardando}
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button
              className="contacto__boton"
              type="submit"
              disabled={guardando}
              style={{ flex: 1 }}
            >
              {guardando ? 'Guardando...' : 'Guardar Cambios'}
            </button>
            <button
              type="button"
              className="detalle__boton detalle__boton--volver"
              onClick={() => navigate(`/productos/${id}`)}
              disabled={guardando}
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

export default AdminEditarProducto;
