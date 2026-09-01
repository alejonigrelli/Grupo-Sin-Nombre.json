// Obtener el id del producto desde la URL
var params = new URLSearchParams(window.location.search);
var id = parseInt(params.get("id"));

// Buscar el producto en el array
var producto = productos.find(function (p) {
  return p.id === id;
});

var contenedor = document.getElementById("detalle-contenido");

if (producto) {
  // Crear imagen
  var img = document.createElement("img");
  img.src = "../" + producto.imagen;
  img.alt = producto.nombre;
  img.className = "detalle__imagen";

  // Crear seccion de info
  var info = document.createElement("div");
  info.className = "detalle__info";

  var nombre = document.createElement("h1");
  nombre.className = "detalle__nombre";
  nombre.textContent = producto.nombre;

  var descripcion = document.createElement("p");
  descripcion.className = "detalle__descripcion";
  descripcion.textContent = producto.descripcion;

  var materiales = document.createElement("p");
  materiales.className = "detalle__dato";
  materiales.innerHTML = "<strong>Materiales:</strong> " + producto.materiales;

  var dimensiones = document.createElement("p");
  dimensiones.className = "detalle__dato";
  dimensiones.innerHTML = "<strong>Dimensiones:</strong> " + producto.dimensiones;

  var precio = document.createElement("p");
  precio.className = "detalle__precio";
  precio.textContent = "$" + producto.precio.toLocaleString();

  var boton = document.createElement("button");
  boton.className = "detalle__boton";
  boton.textContent = "Añadir al Carrito";
  boton.addEventListener("click", function () {
    agregarAlCarrito(producto.id);
  });

  info.appendChild(nombre);
  info.appendChild(descripcion);
  info.appendChild(materiales);
  info.appendChild(dimensiones);
  info.appendChild(precio);
  info.appendChild(boton);

  contenedor.appendChild(img);
  contenedor.appendChild(info);
} else {
  contenedor.innerHTML = "<p>Producto no encontrado.</p>";
}
