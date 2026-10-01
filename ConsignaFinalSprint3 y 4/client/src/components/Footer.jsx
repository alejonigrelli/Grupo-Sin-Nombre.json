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
          <h3 className="footer__titulo">Paginas</h3>
          <div className="footer__links">
            <a href="#">Inicio</a>
            <a href="#">Productos</a>
            <a href="#">Contacto</a>
          </div>
        </div>
        <div>
          <p className="footer__copy">&copy; 2026 Muebleria Hermanos Jota. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
