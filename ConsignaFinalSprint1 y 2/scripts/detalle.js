const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get("id"), 10);
const contenedor = document.getElementById("detalle-contenido");

const producto = productos.find(function (p) {
  return p.id === id;
});

if (producto && contenedor) {
  // Construccion dinamica de especificaciones tecnicas
  let especificacionesHTML = "";
  if (producto.especificaciones) {
    especificacionesHTML = Object.entries(producto.especificaciones)
      .map(function ([clave, valor]) {
        return `<p class="detalle__dato"><strong>${clave}:</strong> ${valor}</p>`;
      })
      .join("");
  }

  contenedor.innerHTML = `
    <img src="${producto.imagen}" alt="${producto.nombre}" class="detalle__imagen">
    <div class="detalle__info">
      <h1 class="detalle__nombre">${producto.nombre}</h1>
      <p class="detalle__descripcion">${producto.descripcion}</p>
      ${especificacionesHTML}
      <p class="detalle__precio">$${producto.precio.toLocaleString("es-AR")}</p>
      <button class="detalle__boton" id="btn-agregar">Añadir al Carrito</button>
    </div>
  `;

  document.getElementById("btn-agregar").addEventListener("click", function () {
    agregarAlCarrito(producto.id);
  });
} else if (contenedor) {
  contenedor.innerHTML = `
    <div class="detalle__no-encontrado">
      <h1>Producto no encontrado</h1>
      <p>El producto seleccionado no existe o el enlace es incorrecto.</p>
      <a href="productos.html" class="producto-card__link">Volver al catalogo</a>
    </div>
  `;
}