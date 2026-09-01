// scripts/app.js
const CLAVE_CARRITO = "hermanos-jota-carrito";

/** Obtiene la cantidad actual guardada en localStorage */
function obtenerCantidadCarrito() {
  const guardado = localStorage.getItem(CLAVE_CARRITO);
  const total = Number.parseInt(guardado, 10);
  return Number.isNaN(total) ? 0 : total;
}

/** Refresca el número en el span del header */
function actualizarContadorCarrito() {
  const contador = document.getElementById("carrito-contador");
  if (contador) {
    contador.textContent = String(obtenerCantidadCarrito());
  }
}

/** Incrementa en 1 la cantidad y persiste en localStorage */
function agregarAlCarrito(productoId) {
  const nuevaCantidad = obtenerCantidadCarrito() + 1;
  localStorage.setItem(CLAVE_CARRITO, String(nuevaCantidad));
  actualizarContadorCarrito();
}

// Actualiza el contador apenas carga cualquier página
document.addEventListener("DOMContentLoaded", actualizarContadorCarrito);