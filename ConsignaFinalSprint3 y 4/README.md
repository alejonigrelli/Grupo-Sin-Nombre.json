# Mueblería Hermanos Jota — Grupo Sin Nombre

## Integrantes
- Gabriel Ollier
- Ivan Mariano Yamin
- Justo Cardilli
- Sebastian Farnochi
- Alejo Nigrelli

## Arquitectura
/
├── backend/          # Servidor Node.js + Express
│   ├── data/
│   │   └── productos.js     # Array de productos (datos locales)
│   ├── routes/
│   │   └── productos.js     # Rutas con express.Router
│   ├── public/
│   │   └── img/              # Imágenes de productos servidas estáticamente
│   └── index.js              # Servidor principal, middlewares
│
└── client/           # Aplicación React (create-react-app)
    └── src/
        ├── components/
        │   ├── Navbar.jsx
        │   ├── Footer.jsx
        │   ├── ProductCard.jsx
        │   ├── ProductList.jsx
        │   ├── ProductDetail.jsx
        │   └── ContactForm.jsx
        ├── App.js            # Estado del carrito, fetch, renderizado condicional
        └── App.css           # Estilos (mismos del sprint anterior)

## Instalación y ejecución
### Backend (puerto 5000)
```bash
cd backend
npm install
npm start
```
### Frontend (puerto 3000)
Abrir una terminal separada:
```bash
cd client
npm install
npm start
```

Luego abrir el navegador en **http://localhost:3000**

> ⚠️ El backend debe estar corriendo **antes** de iniciar el frontend para que el fetch funcione correctamente.


## Decisiones técnicas

- **express.Router**: Las rutas de `/api/productos` están en un archivo separado (`routes/productos.js`) para mantener el código modular.
- **Middleware de logging**: Se implementó un middleware global que registra en consola el método HTTP y la URL de cada petición.
- **express.json()**: Middleware incluido para futuras peticiones POST.
