# AGENTS.md — Backend de Mueblería Hermanos Jota

## Qué es este proyecto
API REST de un e-commerce de muebles. Express + MongoDB (Atlas) con Mongoose.
El frontend React está en la carpeta `client`, junto a `backend`.

## Stack (no cambiar versiones ni agregar librerías sin pedirlo)
- Node 22 · Express 5 · Mongoose 9 · CommonJS (`require` / `module.exports`).
- Variables de entorno cargadas desde `.env` con el paquete `dotenv`.
- Pruebas: `node --test`, ejecutadas con `npm test` (sin Jest ni Mocha).

## Estructura
- `index.js`: configura Express, middlewares, archivos estáticos, rutas y manejadores de errores; también conecta a MongoDB y arranca el servidor.
- `models/`: modelos de Mongoose, actualmente `Product.js`.
- `routes/`: routers de Express por recurso, actualmente `productos.js`. No hay carpeta `controllers/` ni archivo `db.js`.
- `seed.js`: carga productos iniciales en MongoDB.
- La lógica de base de datos existente está en los routers y en `seed.js`.

## Reglas de la API
- Rutas bajo `/api/<recurso-en-plural>`.
- Las rutas actuales de productos responden errores con `{ "mensaje": "...", "error": "..." }` o `{ "mensaje": "..." }`. No cambiar respuestas existentes salvo que la tarea o su contrato lo requiera.
- `index.js` tiene un manejador de errores que responde 500; las rutas existentes manejan sus errores con `try/catch`. No asumir que traduce automáticamente errores de Mongoose a otros códigos.
- Respetar los códigos y formatos de respuesta establecidos por cada endpoint y por la especificación de la tarea en curso.
- Nombres de campos en español, como el modelo Product: nombre, descripcion, precio, stock, imagenUrl.

## Límites negativos (lo que NO hay que hacer)
- NO refactorizar el manejo de errores ni las opciones de actualización de endpoints existentes si la tarea no lo pide.
- NO escribir el connection string en el código ni tocar el archivo .env.
- NO cambiar nombres de campos ni de rutas que ya existen: el frontend depende de ellos.
- NO modificar archivos fuera de lo que pide cada tarea. Si hace falta, preguntar primero.

## Cómo trabajar
- Una tarea por vez. Al terminar cada una, listar qué archivos cambiaste y por qué.
- Revisar el diff antes de aceptar los cambios.
- Para ejecutar `npm test`, iniciar el servidor en una terminal y correr las pruebas en otra. La API escucha por defecto en el puerto 5000; las pruebas usan `http://localhost:3000/api` por defecto. Si se usa otro puerto, configurar `API_URL` para las pruebas.
- No guardar credenciales ni connection strings en el repositorio.

## Reglas de trabajo (agregadas después de la práctica de Categorías)

- Si una regla de este archivo choca con el código que ya existe, avisá y preguntá antes de refactorizar código que no es parte de la tarea.
- Si la spec no define un caso, preguntá. No decidas.
- NO cambies los mensajes ni el formato de respuestas que ya existen.
- NO mates procesos, liberes puertos ni reinicies el servidor sin pedir permiso.
- NO corras comandos que escriban en la base (npm test, npm run test:auth, npm run seed) sin avisar antes.
- Si la misma lógica va en dos rutas, usá una función o un middleware compartido.
- Al terminar cada fase, listá TODOS los archivos que tocaste, incluso los cambios de formato.

## Seguridad (autenticación)

- NO leas, muestres ni copies el contenido de `.env`. Si necesitás una variable nueva, agregá la clave vacía a `.env.example` y avisá.
- NO escribas secretos en el código: el secreto del token se lee de `process.env.JWT_SECRET`.
- NUNCA devuelvas la contraseña ni su hash en una respuesta, ni la pongas en el payload del token.
- NO instales paquetes que no estén en la spec (`bcrypt` o `bcryptjs`, y `jsonwebtoken`).
- NO modifiques `tests/auth.test.cjs`. Si una prueba falla, se corrige el backend.
- NO crees archivos de prueba nuevos sin pedir permiso. Las pruebas del contrato son las de `tests/auth.test.cjs`.
