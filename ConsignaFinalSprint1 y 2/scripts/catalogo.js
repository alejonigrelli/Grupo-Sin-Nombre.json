// Renderizar productos en la grilla
function renderizarProductos(lista) {
  var grilla = document.getElementById("grilla-productos");
  grilla.innerHTML = "";

  for (var i = 0; i < lista.length; i++) {
    var producto = lista[i];

    var card = document.createElement("article");
    card.className = "producto-card";

    var img = document.createElement("img");
    img.src = "../" + producto.imagen;
    img.alt = producto.nombre;
    img.className = "producto-card__imagen";

    var info = document.createElement("div");
    info.className = "producto-card__info";

    var nombre = document.createElement("h3");
    nombre.className = "producto-card__nombre";
    nombre.textContent = producto.nombre;

    var precio = document.createElement("p");
    precio.className = "producto-card__precio";
    precio.textContent = "$" + producto.precio.toLocaleString();

    var link = document.createElement("a");
    link.className = "producto-card__link";
    link.href = "producto.html?id=" + producto.id;
    link.textContent = "Ver detalle";

    info.appendChild(nombre);
    info.appendChild(precio);
    info.appendChild(link);
    card.appendChild(img);
    card.appendChild(info);
    grilla.appendChild(card);
  }
}

// Carga asincrona simulada con setTimeout
setTimeout(function () {
  renderizarProductos(productos);
}, 500);

// Busqueda de productos
var buscador = document.getElementById("buscador");
buscador.addEventListener("input", function () {
  var texto = buscador.value.toLowerCase();
  var filtrados = productos.filter(function (p) {
    return p.nombre.toLowerCase().includes(texto);
  });
  renderizarProductos(filtrados);
});
