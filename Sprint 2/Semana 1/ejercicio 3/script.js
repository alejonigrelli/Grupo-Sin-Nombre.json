let continuar = true
let valorTotal = 0

while (continuar) {
    
    continuar = confirm('Desea agregar un producto al carrito?')

    if(continuar === true){
        const valorAgregado = parseFloat(prompt("ingrese el valor del producto: "))
        if (!Number.isNaN(valorAgregado)){
            valorTotal += valorAgregado
        } else {
            alert("El numero ingresado no es un numero!!!")
        }
    }
}

alert(`El Total de su compra es de: ${valorTotal}`)