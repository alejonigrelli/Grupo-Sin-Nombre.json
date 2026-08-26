const contrasenaCorrecta = "12345fire"
const savePass = prompt("Ingresa la password")

if (contrasenaCorrecta === savePass){
    alert("Bienvenido de nuevo!!!")
} else if (savePass === ""){
    alert("No se ingreso ninguna password")
} else {
    alert("Password incorrecta. Acceso denegado.")
}