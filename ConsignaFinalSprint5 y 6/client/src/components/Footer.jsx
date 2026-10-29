import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div>
          <h3 className="footer__titulo">Contacto</h3>
          <p className="footer__texto">hermanosjota@email.com</p>
          <p className="footer__texto">(011) 1234-5678</p>
        </div>
        <div>
          <h3 className="footer__titulo">Páginas</h3>
          <div className="footer__links">
            <Link to="/">Inicio</Link>
            <Link to="/productos">Productos</Link>
            <Link to="/contacto">Contacto</Link>
          </div>
        </div>
        <div>
          <p className="footer__copy">&copy; 2026 Mueblería Hermanos Jota. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer> 
  );
}

export default Footer;
