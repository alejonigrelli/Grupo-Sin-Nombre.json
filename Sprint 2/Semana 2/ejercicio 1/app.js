const catalogoMuebles = [
    {id: 0, nombre:"Mesa de cristal", precio:35000, imagenURL:"img/mesaCristal.webp"},
    {id:1, nombre:"Silla Madera", precio:20000, imagenURL:"img/sillaMadera.jpg"},
    {id:2, nombre:"PC Gamer", precio:150000, imagenURL:"img/pcGamer.jpg"}
]

const seleccionarCont = document.querySelector("#product-container")

catalogoMuebles.forEach((producto) => {
    const nuevoDiv = document.createElement('div')
    nuevoDiv.setAttribute('class', 'product-card')

    const createH3 = document.createElement('h3')
    createH3.textContent = producto.nombre

    const createparrafo = document.createElement('p')
    createparrafo.textContent = producto.precio

    const createImg = document.createElement('img')
    createImg.src = producto.imagenURL

    nuevoDiv.appendChild(createH3)
    nuevoDiv.appendChild(createparrafo)
    nuevoDiv.appendChild(createImg)
    seleccionarCont.appendChild(nuevoDiv)
})