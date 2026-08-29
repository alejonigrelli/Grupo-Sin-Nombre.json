const botonFav = document.querySelector('.boton')

botonFav.addEventListener('click',  function() {
    botonFav.classList.toggle('favorito')
    if (botonFav.classList.contains('favorito')){
        botonFav.textContent = "⭐ Quitar de Favoritos"
    }else{
       botonFav.textContent = "❤️ Añadir a Favoritos" 
    }
        
})