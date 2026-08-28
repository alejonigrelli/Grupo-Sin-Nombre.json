const precioBaseSilla = 4500.50;
const iva = 0.21;

function calcularIva(precioBaseSilla, iva) {
    let valorIva = precioBaseSilla * iva; 
    return valorIva;
}

function precioFinal(precioBaseSilla, iva) {
    let precioFinal = precioBaseSilla + calcularIva(precioBaseSilla, iva);
    return precioFinal;
}

console.log("Precio base de la silla: ", precioBaseSilla, "\nIVA: ", iva, "\nPrecio final: ", precioFinal(precioBaseSilla, iva));