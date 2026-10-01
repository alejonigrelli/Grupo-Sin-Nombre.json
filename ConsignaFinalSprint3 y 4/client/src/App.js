import { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [vista, setVista] = useState('inicio');
  const [carrito] = useState([]);

  return (
      <div className="app">
      <Navbar cantidadCarrito={carrito.length} onNavigate={setVista} />

      <main>
        {vista === 'inicio' && (
          <section className="hero">
            <h1 className="hero__titulo">Muebles con estilo para tu hogar</h1>
            <p className="hero__subtitulo">
              Fabricados en madera maciza con la mejor calidad artesanal
            </p>
            <button
              className="hero__boton"
              type="button"
              onClick={() => setVista('productos')}
            >
              Ver Catalogo
            </button>
          </section>
        )}

        {vista === 'productos' && (
          <section className="seccion">
            <div className="container">
              <h1 className="seccion__titulo">Nuestros Productos</h1>
              <p className="vista-placeholder">
                El catalogo se va a conectar a la API en el proximo paso.
              </p>
            </div>
          </section>
        )}

        {vista === 'contacto' && (
          <section className="contacto">
            <div className="container">
              <h1 className="seccion__titulo">Contactanos</h1>
              <p className="vista-placeholder">
                El formulario de contacto se arma en un proximo paso.
              </p>
            </div>
          </section>
        )}
      </main>

      <Footer onNavigate={setVista} />
    </div>
  );
}

export default App;
