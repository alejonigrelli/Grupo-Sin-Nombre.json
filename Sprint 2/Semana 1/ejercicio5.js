function aplicarDescuento(precio, porcentajeDescuento){
    let descuento = precio*porcentajeDescuento/100;
    let precioFinal = precio - descuento;
    return precioFinal;
}



const precioMesa = 10000;
const precioSofa = 15000;

const descuentoMesa = 50;
const descuentoSofa = 10;

const precioFinalMesa = aplicarDescuento(precioMesa,descuentoMesa);
const precioFinalSofa = aplicarDescuento(precioSofa,descuentoSofa);

console.log('Precio Original Mesa:',precioMesa,'- Descuento: %',descuentoMesa,'PrecioFinal: $',precioFinalMesa)
console.log('Precio Original Sofa:',precioSofa,'- Descuento: %',descuentoSofa,'PrecioFinal: $',precioFinalSofa)