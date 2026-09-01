// En productos.js las rutas de imagen se guardan desde la raiz del proyecto
// (por ejemplo "img/productos/AparadorUspallata.png"), porque asi las usa
// index.html. Esta pagina vive dentro de /pages, o sea un nivel mas abajo,
// asi que hay que subir uno con "../" para llegar a la carpeta img.
const RUTA_BASE = "../";

/** Formatea un numero como precio en moneda ARS */
function formatearPrecio(precio) {
  return "$" + precio.toLocaleString("es-AR");
}

/** Renderiza la coleccion de productos recibida en la grilla */
function renderizarProductos(lista) {
  const grilla = document.getElementById("grilla-productos");
  if (!grilla) return;

  grilla.innerHTML = "";

  if (lista.length === 0) {
    grilla.innerHTML = "<p class='productos-vacio'>No se encontraron productos que coincidan con la busqueda.</p>";
    return;
  }

  lista.forEach(function (producto) {
    const card = document.createElement("article");
    card.className = "producto-card";

    card.innerHTML = `
      <img src="${RUTA_BASE}${producto.imagen}" alt="${producto.nombre}" class="producto-card__imagen" loading="lazy">
      <div class="producto-card__info">
        <h3 class="producto-card__nombre">${producto.nombre}</h3>
        <p class="producto-card__precio">${formatearPrecio(producto.precio)}</p>
        <a href="producto.html?id=${producto.id}" class="producto-card__link">Ver detalle</a>
      </div>
    `;

    grilla.appendChild(card);
  });
}

// Carga asincrona simulada
setTimeout(function () {
  renderizarProductos(productos);
}, 500);

// Busqueda en vivo por nombre y categoria
const buscador = document.getElementById("buscador");
if (buscador) {
  buscador.addEventListener("input", function () {
    const texto = buscador.value.trim().toLowerCase();
    const filtrados = productos.filter(function (p) {
      return p.nombre.toLowerCase().includes(texto) || p.categoria.toLowerCase().includes(texto);
    });
    renderizarProductos(filtrados);
  });
}