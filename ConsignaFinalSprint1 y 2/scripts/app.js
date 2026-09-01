/* ===== CARRITO SIMULADO ===== */
let carrito = [];

function agregarAlCarrito(productoId) {
  var producto = productos.find(function (p) {
    return p.id === productoId;
  });
  if (producto) {
    carrito.push(producto);
    actualizarContador();
  }
}

function actualizarContador() {
  var contador = document.getElementById("carrito-contador");
  if (contador) {
    contador.textContent = carrito.length;
  }
}
