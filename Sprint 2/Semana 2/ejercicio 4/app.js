const formulario = document.querySelector('form')
const inputUsername = document.querySelector('#input-username')
const divResultado = document.querySelector('#resultado')

formulario.addEventListener('submit', function(e){
    e.preventDefault()
    async function buscarUsuario(params) {
        try{
            const username = inputUsername.value
            const response = await fetch(`https://jsonplaceholder.typicode.com/users?username=${username}`)
            const data = await response.json()

            if (data.length > 0){
                divResultado.textContent = data[0].name + " - " + data[0].email + " - " + data[0].address.city
            } else {
                divResultado.textContent = "Usuario no encontrado."
            }
        } catch (error) {
            divResultado.textContent = "Usuario no encontrado."
        }
    }
    buscarUsuario()
})