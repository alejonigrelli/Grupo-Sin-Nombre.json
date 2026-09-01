const formulario = document.getElementById("formulario-contacto");

if (formulario) {
  formulario.addEventListener("submit", function (event) {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const mensaje = document.getElementById("mensaje").value.trim();

    const errorNombre = document.getElementById("error-nombre");
    const errorEmail = document.getElementById("error-email");
    const errorMensaje = document.getElementById("error-mensaje");
    const mensajeExito = document.getElementById("mensaje-exito");

    // Limpieza de estados previos
    errorNombre.textContent = "";
    errorEmail.textContent = "";
    errorMensaje.textContent = "";
    mensajeExito.style.display = "none";

    let esValido = true;

    if (nombre === "") {
      errorNombre.textContent = "El nombre es obligatorio.";
      esValido = false;
    }

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === "") {
      errorEmail.textContent = "El email es obligatorio.";
      esValido = false;
    } else if (!regexEmail.test(email)) {
      errorEmail.textContent = "Ingresa un email valido.";
      esValido = false;
    }

    if (mensaje === "") {
      errorMensaje.textContent = "El mensaje es obligatorio.";
      esValido = false;
    }

    if (esValido) {
      mensajeExito.style.display = "block";
      formulario.reset();
    }
  });
}
