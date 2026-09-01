var formulario = document.getElementById("formulario-contacto");

formulario.addEventListener("submit", function (event) {
  event.preventDefault();

  // Obtener valores
  var nombre = document.getElementById("nombre").value.trim();
  var email = document.getElementById("email").value.trim();
  var mensaje = document.getElementById("mensaje").value.trim();

  // Obtener spans de error
  var errorNombre = document.getElementById("error-nombre");
  var errorEmail = document.getElementById("error-email");
  var errorMensaje = document.getElementById("error-mensaje");

  // Limpiar errores previos
  errorNombre.textContent = "";
  errorEmail.textContent = "";
  errorMensaje.textContent = "";

  var esValido = true;

  // Validar nombre
  if (nombre === "") {
    errorNombre.textContent = "El nombre es obligatorio.";
    esValido = false;
  }

  // Validar email con regex
  var regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email === "") {
    errorEmail.textContent = "El email es obligatorio.";
    esValido = false;
  } else if (!regexEmail.test(email)) {
    errorEmail.textContent = "Ingresa un email valido.";
    esValido = false;
  }

  // Validar mensaje
  if (mensaje === "") {
    errorMensaje.textContent = "El mensaje es obligatorio.";
    esValido = false;
  }

  // Si todo es valido, mostrar mensaje de exito
  if (esValido) {
    var mensajeExito = document.getElementById("mensaje-exito");
    mensajeExito.style.display = "block";
    formulario.reset();
  }
});
