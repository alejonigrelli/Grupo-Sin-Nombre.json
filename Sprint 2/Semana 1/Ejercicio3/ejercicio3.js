let totalCompra = 0;

 while(confirm("¿Desea agregar un producto al carrito de compras?"))  {
    let valorProducto = parseFloat(prompt("Ingrese el valor del producto: "));
    if(!isNaN(valorProducto) && valorProducto > 0 ) {
        totalCompra += valorProducto;
    } else {
        alert("Por favor, ingrese un valor numérico válido mayor a 0.");
    }
}

alert(`El total de la compra es: $ ${totalCompra}`);