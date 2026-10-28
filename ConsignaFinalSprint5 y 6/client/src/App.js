import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProductList from './components/ProductList';
import ProductCard from './components/ProductCard';
import ProductDetail from './components/ProductDetail';
import ContactForm from './components/ContactForm';
import './App.css';

function App() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // Carrito de compras con persistencia en localStorage
  const [carrito, setCarrito] = useState(() => {
    const carritoGuardado = localStorage.getItem('carrito');
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
  });

  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  // Fetch a GET /api/productos
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

  const agregarAlCarrito = (producto) => {
    const id = producto._id || producto.id;
    setCarrito(prev => {
      const existe = prev.find(item => (item._id || item.id) === id);
      if (existe) {
        return prev.map(item =>
          (item._id || item.id) === id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  const cantidadCarrito = carrito.reduce((total, item) => total + item.cantidad, 0);
  const productosDestacados = productos.filter(p => p.destacado === true || p.stock > 0).slice(0, 4);

  return (
    <Router>
      <div className="App">
        <Navbar cantidadCarrito={cantidadCarrito} />

        <main>
          <Routes>
            {/* Ruta / — Inicio */}
            <Route
              path="/"
              element={
                <>
                  <section className="hero">
                    <h1 className="hero__titulo">Muebles con estilo para tu hogar</h1>
                    <p className="hero__subtitulo">Fabricados en madera maciza con la mejor calidad artesanal</p>
                    <Link to="/productos" className="hero__boton">Ver Catálogo</Link>
                  </section>

                  <section className="seccion">
                    <div className="container">
                      <h2 className="seccion__titulo">Productos Destacados</h2>
                      {cargando && <p>Cargando productos destacados...</p>}
                      {error && <p className="estado-error">Error: {error}</p>}
                      {!cargando && !error && (
                        productosDestacados.length === 0 ? (
                          <p style={{ textAlign: 'center' }}>No hay productos destacados por el momento.</p>
                        ) : (
                          <div className="productos-grilla">
                            {productosDestacados.map(producto => (
                              <ProductCard
                                key={producto._id || producto.id}
                                producto={producto}
                                onAgregarCarrito={agregarAlCarrito}
                              />
                            ))}
                          </div>
                        )
                      )}
                    </div>
                  </section>
                </>
              }
            />

            {/* Ruta /productos — Catálogo */}
            <Route
              path="/productos"
              element={
                <ProductList
                  productos={productos}
                  cargando={cargando}
                  error={error}
                  onAgregarCarrito={agregarAlCarrito}
                />
              }
            />

            {/* Ruta /productos/:id — Detalle dinámico */}
            <Route
              path="/productos/:id"
              element={<ProductDetail onAgregarCarrito={agregarAlCarrito} />}
            />

            {/* Ruta /contacto — Formulario */}
            <Route path="/contacto" element={<ContactForm />} />

            {/* Ruta /carrito — Carrito de compras */}
            <Route
              path="/carrito"
              element={
                <section className="seccion">
                  <div className="container">
                    <h1 className="seccion__titulo">Tu Carrito</h1>
                    {carrito.length === 0 ? (
                      <p style={{ textAlign: 'center' }}>El carrito está vacío.</p>
                    ) : (
                      <>
                        <div className="carrito-lista">
                          {carrito.map(item => (
                            <div key={item._id || item.id} className="carrito-item">
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
                          <button
                            type="button"
                            className="detalle__boton detalle__boton--volver"
                            onClick={vaciarCarrito}
                          >
                            Vaciar Carrito
                          </button>
                        </div>
                      </>
                    )}
                    <div style={{ textAlign: 'center' }}>
                      <Link to="/productos" className="detalle__boton">
                        Seguir comprando
                      </Link>
                    </div>
                  </div>
                </section>
              }
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
