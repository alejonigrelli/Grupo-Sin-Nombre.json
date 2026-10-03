import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ContactForm from './components/ContactForm';
import './App.css';
import ProductDetail from './components/ProductDetail';
import ProductList from './components/ProductList';
import ProductosDestacados from './components/ProductosDestacados';

function App() {
  const [vista, setVista] = useState('inicio');
  const [carrito] = useState([]);
  const [productos, setProductos] = useState([]); // <--- Estado para guardar los productos
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  // Cargamos los productos del backend al iniciar la app
  useEffect(() => {
    fetch('http://localhost:5000/api/productos') // Ajustá la URL si tu backend usa otra ruta
      .then(res => res.json())
      .then(data => setProductos(data))
      .catch(err => console.error("Error al cargar productos:", err));
  }, []);

  return (
    <div className="app">
      <Navbar cantidadCarrito={carrito.length} onNavigate={setVista} />

      <main>
        {vista === 'inicio' && (
          <>
            <div className="hero">
              <h1 className="hero__titulo">Muebles con estilo para tu hogar</h1>
              <p className="hero__subtitulo">Fabricados en madera maciza con la mejor calidad artesanal</p>
              <button 
                className="hero__boton" 
                type="button" 
                onClick={() => setVista('productos')}
              >
                Ver Catalogo
              </button>
            </div>

            <section className="seccion">
              <div className="container">
                <h2 className="seccion__titulo">Productos Destacados</h2>
                <ProductosDestacados 
                  productos={productos} 
                  onVerDetalle={(prod) => {
                    setProductoSeleccionado(prod);
                    setVista('productos');
                  }} 
                />
              </div>
            </section>
          </>
        )}

        {vista === 'productos' && (
          <div style={{ padding: '2rem 0' }}>
            {productoSeleccionado ? (
              <ProductDetail 
                producto={productoSeleccionado} 
                onVolver={() => setProductoSeleccionado(null)} 
              />
            ) : (
              <ProductList 
                productos={productos} 
                onVerDetalle={(prod) => setProductoSeleccionado(prod)} 
              />
            )}
          </div>
        )}
        
        {vista === 'contacto' && <ContactForm />}
      </main>

      <Footer onNavigate={setVista} />
    </div>
  );
}

export default App;
