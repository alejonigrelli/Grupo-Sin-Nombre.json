import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import ContactForm from './components/ContactForm';
import './App.css';

function App() {
  // Estado de productos y fetch
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // Carrito de compras como estado en App.js con persistencia en localStorage
  const [carrito, setCarrito] = useState(() => {
    const carritoGuardado = localStorage.getItem('carrito');
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
  });

  // Guardar en localStorage cada vez que el carrito cambie
  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  // Estado para renderizado condicional
  const [vista, setVista] = useState('inicio');
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  // Fetch a GET /api/productos con estados de carga y error
  useEffect(() => {
    fetch('http://localhost:5000/api/productos')
      .then(res => {
        if (!res.ok) throw new Error('Error al obtener productos');
        return res.json();
      })
      .then(data => {
        setProductos(data);
        setCargando(false);
      })
      .catch(err => {
        setError(err.message);
        setCargando(false);
      });
  }, []);

  // Agregar producto al carrito
  const agregarAlCarrito = (producto) => {
    setCarrito(prev => {
      const existe = prev.find(item => item.id === producto.id);
      if (existe) {
        return prev.map(item =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });
  };

  // Detalle de producto vía renderizado condicional
  const verDetalle = (producto) => {
    setProductoSeleccionado(producto);
    setVista('detalle');
  };

  // Vaciar carrito
  const vaciarCarrito = () => {
    setCarrito([]);
  };

  // Contador en Navbar vía props
  const cantidadCarrito = carrito.reduce((total, item) => total + item.cantidad, 0);

  // Productos destacados para la página de inicio
  const productosDestacados = productos.filter(p => p.destacado === true);

  return (
    <div className="App">
      <Navbar
        cantidadCarrito={cantidadCarrito}
        onVerCarrito={() => setVista('carrito')}
        onVerInicio={() => setVista('inicio')}
        onVerProductos={() => setVista('productos')}
        onVerContacto={() => setVista('contacto')}
      />

      <main>
        {vista === 'inicio' && (
          <>
            <section className="hero">
              <h1 className="hero__titulo">Muebles con estilo para tu hogar</h1>
              <p className="hero__subtitulo">Fabricados en madera maciza con la mejor calidad artesanal</p>
              <button className="hero__boton" onClick={() => setVista('productos')}>Ver Catalogo</button>
            </section>

            <section className="seccion">
              <div className="container">
                <h2 className="seccion__titulo">Productos Destacados</h2>
                {cargando && <p>Cargando productos destacados...</p>}
                {error && <p className="estado-error">Error: {error}</p>}
                {!cargando && !error && (
                  <div className="productos-grilla">
                    {productosDestacados.map(producto => (
                      <article key={producto.id} className="producto-card">
                        <img
                          src={`/${producto.imagen}`}
                          alt={producto.nombre}
                          className="producto-card__imagen"
                          loading="lazy"
                        />
                        <div className="producto-card__info">
                          <h3 className="producto-card__nombre">{producto.nombre}</h3>
                          <p className="producto-card__precio">${producto.precio.toLocaleString('es-AR')}</p>
                          <a
                            href="#"
                            className="producto-card__link"
                            onClick={(e) => { e.preventDefault(); verDetalle(producto); }}
                          >
                            Ver detalle
                          </a>
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </div>
            </section>
          </>
        )}

        {vista === 'productos' && (
          <ProductList
            productos={productos}
            cargando={cargando}
            error={error}
            onVerDetalle={verDetalle}
            onAgregarCarrito={agregarAlCarrito}
          />
        )}

        {vista === 'detalle' && (
          <ProductDetail
            producto={productoSeleccionado}
            onVolver={() => setVista('productos')}
            onAgregarCarrito={agregarAlCarrito}
          />
        )}

        {vista === 'contacto' && (
          <ContactForm />
        )}

        {vista === 'carrito' && (
          <section className="seccion">
            <div className="container">
              <h1 className="seccion__titulo">Tu Carrito</h1>
              {carrito.length === 0 ? (
                <p style={{ textAlign: 'center' }}>El carrito está vacío.</p>
              ) : (
                <>
                  <div className="carrito-lista">
                    {carrito.map(item => (
                      <div key={item.id} className="carrito-item">
                        <span className="carrito-item__nombre">{item.nombre}</span>
                        <span className="carrito-item__cantidad">x{item.cantidad}</span>
                        <span className="carrito-item__precio">
                          ${(item.precio * item.cantidad).toLocaleString('es-AR')}
                        </span>
                      </div>
                    ))}
                  </div>
                  <p className="carrito-total">
                    Total: ${carrito.reduce((t, i) => t + i.precio * i.cantidad, 0).toLocaleString('es-AR')}
                  </p>
                  <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                    <button className="detalle__boton detalle__boton--volver" onClick={vaciarCarrito}>
                      Vaciar Carrito
                    </button>
                  </div>
                </>
              )}
              <div style={{ textAlign: 'center' }}>
                <button className="detalle__boton" onClick={() => setVista('inicio')}>
                  Seguir comprando
                </button>
              </div>
            </div>
          </section>
        )}
      </main>
        
      <Footer 
        onVerInicio={() => setVista('inicio')}
        onVerProductos={() => setVista('productos')}
        onVerContacto={() => setVista('contacto')}
      />
      
    </div>
  );
}

export default App;
