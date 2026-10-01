const express = require('express');
const router = express.Router();
const productos = require('../data/productos');

// GET /api/productos = listado completo en JSON
router.get('/', (req, res) => {
  res.json(productos);
});

// GET /api/productos/:id = producto por id, 404 si no existe
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const producto = productos.find(p => p.id === id);

  if (!producto) {
    return res.status(404).json({ mensaje: 'Producto no encontrado' });
  }

  res.json(producto);
});

module.exports = router;
