# Mueblería Hermanos Jota — Grupo Sin Nombre

## Integrantes
- Gabriel Ollier
- Ivan Mariano Yamin
- Justo Cardilli
- Sebastian Farnochi
- Alejo Nigrelli

## Arquitectura
```text
/
├── backend/          # Servidor Node.js + Express + Mongoose + MongoDB Atlas
│   ├── data/
│   │   └── productos.js     # Datos iniciales para sembrar la base de datos
│   ├── models/
│   │   └── Product.js       # Modelo y esquema de datos con Mongoose
│   ├── routes/
│   │   └── productos.js     # Rutas CRUD completas (GET, POST, PUT, DELETE)
│   ├── public/
│   │   └── img/             # Imágenes de productos servidas estáticamente
│   ├── .env.example         # Plantilla de variables de entorno
│   ├── seed.js              # Script para poblar la base de datos en MongoDB Atlas
│   └── index.js             # Servidor principal, conexión a MongoDB y middlewares
│
└── client/           # Aplicación React (create-react-app)
    ├── public/
    │   └── _redirects       # Redirección de rutas de React para Netlify
    ├── .env.example         # Plantilla con REACT_APP_API_URL
    ├── vercel.json          # Redirección de rutas de React para Vercel
    └── src/
        ├── components/
        │   ├── Navbar.jsx              # Navegación con Link y NavLink
        │   ├── Footer.jsx              # Pie de página con enlaces de navegación
        │   ├── ProductCard.jsx         # Tarjeta de producto con enlace a detalle
        │   ├── ProductList.jsx         # Catálogo completo de productos
        │   ├── ProductDetail.jsx       # Detalle dinámico con useParams, botones Editar y Eliminar
        │   ├── ContactForm.jsx         # Formulario de contacto con validaciones
        │   ├── AdminCrearProducto.jsx  # Formulario controlado de alta con useNavigate
        │   └── AdminEditarProducto.jsx # Formulario controlado de edición (PUT) con useParams
        ├── config.js         # URL base de la API (REACT_APP_API_URL)
        ├── App.js            # Ruteo con React Router DOM, estado global y carrito
        └── App.css           # Estilos de la aplicación
```

## Instalación y ejecución

### Variables de entorno (.env)
Crear un archivo `.env` dentro de la carpeta `backend/` con estas variables:

| Variable | Obligatoria | Descripción |
|---|---|---|
| `MONGODB_URI` | Sí | Cadena de conexión de MongoDB Atlas (Atlas → Connect → Drivers) |
| `PORT` | No | Puerto del servidor. Por defecto `5000` (en Render se asigna automáticamente) |

En el frontend la variable es opcional en local. Si hace falta cambiarla, crear `client/.env.local` tomando como base `client/.env.example`:

| Variable | Obligatoria | Descripción |
|---|---|---|
| `REACT_APP_API_URL` | Solo en producción | URL del backend, sin barra final. Por defecto `http://localhost:5000` |

> Los archivos `.env` y `.env.local` no se suben al repositorio (están en `.gitignore`).

### Backend (puerto 5000)
```bash
cd backend
npm install
npm run seed   # Opcional: para poblar la base de datos con los productos iniciales
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

> ⚠️ El backend debe estar corriendo **antes** de iniciar el frontend para que las peticiones a la API funcionen correctamente.

## Despliegue

### Backend en Render (Web Service)
- **Root Directory:** `ConsignaFinalSprint5 y 6/backend`
- **Build Command:** `npm install`
- **Start Command:** `npm start`
- **Environment:** agregar `MONGODB_URI` (Render define `PORT` solo)
- En MongoDB Atlas → *Network Access*, permitir `0.0.0.0/0`, porque Render no tiene IP fija en el plan gratuito.

### Frontend en Vercel o Netlify
- **Root / Base Directory:** `ConsignaFinalSprint5 y 6/client`
- **Build Command:** `npm run build`
- **Output / Publish Directory:** `build`
- **Environment:** agregar `REACT_APP_API_URL` con la URL del backend en Render (ej: `https://<servicio>.onrender.com`)

> La variable `REACT_APP_API_URL` se incorpora al momento del build: si se cambia, hay que volver a desplegar el frontend.

## Decisiones técnicas

- **Persistencia en MongoDB Atlas**: Se reemplazó el array estático local por una base de datos en la nube (MongoDB Atlas) usando Mongoose para definir el esquema y modelo `Product`.
- **API RESTful con CRUD completo**: Se implementaron los endpoints en `routes/productos.js` (`GET /`, `GET /:id`, `POST /` con respuesta 201, `PUT /:id`, `DELETE /:id`) con validación y manejo centralizado de errores.
- **Variables de entorno (.env)**: Configuración segura de credenciales mediante `dotenv`, protegiendo la cadena de conexión en `.gitignore`.
- **React Router DOM**: Se implementó un sistema de navegación profesional con rutas declarativas (`/`, `/productos`, `/productos/:id`, `/contacto`, `/admin/crear-producto`, `/admin/editar-producto/:id`, `/carrito`) utilizando `BrowserRouter`, `Routes`, `Route`, `Link` y `NavLink`.
- **Rutas dinámicas con useParams**: La vista de detalle `/productos/:id` obtiene el identificador de la URL para solicitar el producto puntual al backend y renderizarlo.
- **Navegación programática con useNavigate**: Al registrar un producto en `/admin/crear-producto`, la aplicación valida los datos, hace el `POST` al backend y redirige al usuario automáticamente al catálogo.
- **Formularios controlados**: Validación en tiempo real en el formulario de contacto, en el alta y en la edición de productos.
- **CRUD completo desde el frontend**: En `/admin/editar-producto/:id` el formulario se precarga con `GET` y guarda con `PUT`, y luego redirige al detalle. Desde el detalle se puede eliminar un producto (con confirmación y `DELETE`), que redirige al catálogo. En ambos casos el estado global se actualiza sin recargar la página, y el producto eliminado también se quita del carrito.
- **URL de la API configurable**: `src/config.js` lee `REACT_APP_API_URL`, así el mismo código funciona en local y apuntando al backend desplegado en Render.
