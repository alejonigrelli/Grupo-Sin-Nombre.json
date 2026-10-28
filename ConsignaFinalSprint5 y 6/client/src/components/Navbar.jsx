import React from 'react';
import { Link, NavLink } from 'react-router-dom';

function Navbar({ cantidadCarrito }) {
  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="header__logo">
          <img src="/img/productos/logo.svg" alt="Hermanos Jota" className="header__logo-img" />
          {' '}Hermanos Jota
        </Link>
        <nav className="header__nav">
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
            Inicio
          </NavLink>
          <NavLink to="/productos" className={({ isActive }) => (isActive ? 'active' : '')}>
            Productos
          </NavLink>
          <NavLink to="/contacto" className={({ isActive }) => (isActive ? 'active' : '')}>
            Contacto
          </NavLink>
          <NavLink to="/admin/crear-producto" className={({ isActive }) => (isActive ? 'active' : '')}>
            + Crear Producto
          </NavLink>
          <Link to="/carrito" className="header__carrito" aria-label="Carrito de compras">
            &#128722;
            <span className="header__carrito-contador">{cantidadCarrito}</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
