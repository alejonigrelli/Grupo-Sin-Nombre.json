
const totalCompra = 0


while( confirm('Desea agregar un producto al carrito?')){
    let entrada = prompt('Ingrese el valor del producto: ')
    let valor = parseFloat(entrada)
    if (valor>0){
        totalCompra += valor
    }else{
        alert('Por favor, ingrese un monto valido')
    }
}

alert('El total de su compra es: $', totalCompra)