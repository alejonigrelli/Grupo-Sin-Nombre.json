import React from 'react';

function Footer({ onVerInicio, onVerProductos, onVerContacto }) {
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
            <a href="#" onClick={(e) => { e.preventDefault(); onVerInicio(); }}>Inicio</a>
            <a href="#" onClick={(e) => { e.preventDefault(); onVerProductos(); }}>Productos</a>
            <a href="#" onClick={(e) => { e.preventDefault(); onVerContacto(); }}>Contacto</a>
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