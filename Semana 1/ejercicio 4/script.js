const cantidadProductos = parseInt(prompt("Cuantos productos desea agregar a la lista?"))

if (!Number.isNaN(cantidadProductos) && cantidadProductos > 0){
    for (let i = 1; i <= cantidadProductos; i++){
        console.log(`Producto #${i} agregado exitosamente...`)
    }
    console.log(`Se han agregado ${cantidadProductos} exitosamente a la lista`)

}else{
    alert("Ingresa un numero entero valido mayor a 0")
}