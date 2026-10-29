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
    └── src/
        ├── components/
        │   ├── Navbar.jsx              # Navegación con Link y NavLink
        │   ├── Footer.jsx              # Pie de página con enlaces de navegación
        │   ├── ProductCard.jsx         # Tarjeta de producto con enlace a detalle
        │   ├── ProductList.jsx         # Catálogo completo de productos
        │   ├── ProductDetail.jsx       # Detalle dinámico con useParams
        │   ├── ContactForm.jsx         # Formulario de contacto con validaciones
        │   └── AdminCrearProducto.jsx  # Formulario controlado de alta con useNavigate
        ├── App.js            # Ruteo con React Router DOM, estado global y carrito
        └── App.css           # Estilos de la aplicación
```

## Instalación y ejecución

### Variables de entorno (.env)
Crear un archivo `.env` dentro de la carpeta `backend/`

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

## Decisiones técnicas

- **Persistencia en MongoDB Atlas**: Se reemplazó el array estático local por una base de datos en la nube (MongoDB Atlas) usando Mongoose para definir el esquema y modelo `Product`.
- **API RESTful con CRUD completo**: Se implementaron los endpoints en `routes/productos.js` (`GET /`, `GET /:id`, `POST /` con respuesta 201, `PUT /:id`, `DELETE /:id`) con validación y manejo centralizado de errores.
- **Variables de entorno (.env)**: Configuración segura de credenciales mediante `dotenv`, protegiendo la cadena de conexión en `.gitignore`.
- **React Router DOM**: Se implementó un sistema de navegación profesional con rutas declarativas (`/`, `/productos`, `/productos/:id`, `/contacto`, `/admin/crear-producto`, `/carrito`) utilizando `BrowserRouter`, `Routes`, `Route`, `Link` y `NavLink`.
- **Rutas dinámicas con useParams**: La vista de detalle `/productos/:id` obtiene el identificador de la URL para solicitar el producto puntual al backend y renderizarlo.
- **Navegación programática con useNavigate**: Al registrar un producto en `/admin/crear-producto`, la aplicación valida los datos, hace el `POST` al backend y redirige al usuario automáticamente al catálogo.
- **Formularios controlados**: Validación en tiempo real tanto en el formulario de contacto como en el alta de productos.
