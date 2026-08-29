const divGalery = document.querySelector('#galery')

async function  cargarFotos() {
    try{
        const response = await fetch('https://jsonplaceholder.typicode.com/photos?_limit=12')
        const fotos = await response.json()

        fotos.forEach(foto => {
            const img = document.createElement('img')
            img.src = foto.thumbnailUrl
            img.alt = foto.title

            img.addEventListener('click', function(){
                alert(foto.title)
            })
        
            divGalery.appendChild(img)
        });
    } catch (error) {
        console.log('Error cargando las fotos: ', error)
    }
}

document.addEventListener('DOMContentLoaded', cargarFotos)