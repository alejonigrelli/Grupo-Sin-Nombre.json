const preferenciasUsuario = {
        tema: 'oscuro',
        idioma: 'es',
        notificaciones: true
    }

const btnGuardar = document.querySelector('#btn-guardar')

btnGuardar.addEventListener('click', function(){
    const convertJSON = JSON.stringify(preferenciasUsuario)
    localStorage.setItem('misPreferencias',convertJSON)
    alert('Preferencias guardadas')
})


const btnCargar = document.querySelector('#btn-cargar')

btnCargar.addEventListener('click', function(){
    const recuperarLocal = localStorage.getItem('misPreferencias')
    const trasformJSON = JSON.parse(recuperarLocal)
    console.log(trasformJSON)
})