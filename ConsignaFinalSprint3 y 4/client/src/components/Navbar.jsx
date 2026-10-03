function Navbar({ cantidadCarrito, onVerCarrito, onVerInicio, onVerContacto, onVerProductos }) {
  return (
    <header className="header">
      <div className="container">
        <a href="#" className="header__logo" onClick={(e) => { e.preventDefault(); onVerInicio(); }}>
          <img src="/img/productos/logo.svg" alt="Hermanos Jota" className="header__logo-img" />
          {' '}Hermanos Jota
        </a>
        <nav className="header__nav">
          <a href="#" onClick={(e) => { e.preventDefault(); onVerInicio(); }}>Inicio</a>
          <a href="#" onClick={(e) => { e.preventDefault(); onVerProductos(); }}>Productos</a>
          <a href="#" onClick={(e) => { e.preventDefault(); onVerContacto(); }}>Contacto</a>
          <button className="header__carrito" type="button" aria-label="Carrito de compras" onClick={onVerCarrito}>
            &#128722;
            <span className="header__carrito-contador">{cantidadCarrito}</span>
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
