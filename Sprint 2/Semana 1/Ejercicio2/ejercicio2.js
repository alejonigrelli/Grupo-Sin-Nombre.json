// ============================================================
//  Ejercicio 2 - Verificador de Acceso con Contraseña
// ============================================================

// --- 1. La contraseña esperada -----------------------------
const contrasenaCorrecta = "Jota123";

// --- 2. Pedir la contraseña al usuario ---------------------
const contrasenaIngresada = prompt("Ingresá tu contraseña:");

// --- 3. Verificar con if / else if / else ------------------
if (contrasenaIngresada === contrasenaCorrecta) {

  alert("¡Acceso concedido!");

} else if (contrasenaIngresada === "") {

  alert("No se ingresó ninguna contraseña");

} else {

  alert("Contraseña incorrecta. Acceso denegado.");

}
