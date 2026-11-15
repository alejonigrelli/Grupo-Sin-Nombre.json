require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Middleware de logging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
const categoriasRouter = require('./routes/categorias');
const productosRouter = require('./routes/productos');
const usuariosRouter = require('./routes/usuarios');
app.use('/api/categorias', categoriasRouter);
app.use('/api/productos', productosRouter);
app.use('/api/usuarios', usuariosRouter);

// Manejador de 404
app.use((req, res, next) => {
  res.status(404).json({ mensaje: 'Ruta no encontrada' });
});

// Manejador de errores centralizado
app.use((err, req, res, next) => {
  console.error(err.stack);
  if (err.code === 11000) {
    return res.status(409).json({ error: 'El recurso ya existe' });
  }
  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: 'Datos inválidos' });
  }
  res.status(500).json({ mensaje: 'Error interno del servidor', error: err.message });
});

// Conexión a MongoDB y arranque del servidor
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Conectado a MongoDB Atlas');
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error al conectar a MongoDB:', error.message);
  });
