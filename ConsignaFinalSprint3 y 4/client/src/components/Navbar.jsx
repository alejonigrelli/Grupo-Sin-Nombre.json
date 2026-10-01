function Navbar({ cantidadCarrito, onNavigate }) {
  return (
    <header className="header">
      <div className="container">
        <a
          href="#inicio"
          className="header__logo"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('inicio');
          }}
        >
          <img
            src="/img/productos/logo.svg"
            alt="Hermanos Jota"
            className="header__logo-img"
          />
          Hermanos Jota
        </a>
        <nav className="header__nav">
          <a
            href="#inicio"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('inicio');
            }}
          >
            Inicio
          </a>
          <a
            href="#productos"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('productos');
            }}
          >
            Productos
          </a>
          <a
            href="#contacto"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('contacto');
            }}
          >
            Contacto
          </a>
          <button
            className="header__carrito"
            type="button"
            aria-label="Carrito de compras"
          >
            🛒
            <span className="header__carrito-contador">{cantidadCarrito}</span>
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
