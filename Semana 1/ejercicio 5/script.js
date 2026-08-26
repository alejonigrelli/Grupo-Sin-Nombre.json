function aplicarDescuento(precio, porctDesc){
    let  descuento = precio * porctDesc / 100
    let precioFinal = precio - descuento
    return precioFinal
}

const precioMesa = 50000
const precioSilla = 25000

const precioMesaFinal = aplicarDescuento(precioMesa, 15)
const precioSillaFinal = aplicarDescuento(precioSilla, 7)

console.log(`Precio original de la Mesa: $${precioMesa}. Descuento: 15%`)
console.log(`Precio Final de la Mesa con su descuento: $${precioMesaFinal}`)

console.log(`Precio original de la Silla: $${precioSilla}. Descuento: 7%`)
console.log(`Precio Final de la Silla con su descuento: $${precioSillaFinal}`)
