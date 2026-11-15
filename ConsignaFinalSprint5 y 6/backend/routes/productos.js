const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Product = require('../models/Product');
const Categoria = require('../models/Categoria');
const { verificarToken, soloAdmin } = require('../middleware/auth');

// GET /api/productos — devuelve todos los productos o filtra por nombre o categoría
router.get('/', async (req, res) => {
  try {
    const { nombre, categoria } = req.query;
    let filtro = {};

    if (nombre) {
      // Búsqueda insensible a mayúsculas/minúsculas usando una expresión regular
      filtro.nombre = { $regex: nombre, $options: 'i' };
    }

    if (Object.hasOwn(req.query, 'categoria')) {
      if (!mongoose.Types.ObjectId.isValid(categoria)) {
        return res.status(400).json({ error: 'ID de categoría inválido' });
      }
      filtro.categoria = categoria;
    }

    const productos = await Product.find(filtro).populate('categoria', 'nombre');
    res.json(productos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener productos', error: error.message });
  }
});

// GET /api/productos/:id — devuelve un producto por _id
router.get('/:id', async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: 'ID de producto inválido' });
  }

  try {
    const producto = await Product.findById(req.params.id).populate('categoria', 'nombre');
    if (!producto) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }
    res.json(producto);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener el producto', error: error.message });
  }
});

// POST /api/productos — crea un producto, responde 201
router.post('/', verificarToken, soloAdmin, async (req, res) => {
  try {
    if (Object.hasOwn(req.body, 'categoria')) {
      const categoria = await Categoria.findById(req.body.categoria);
      if (!categoria) {
        return res.status(400).json({ error: 'La categoría no existe' });
      }
    }

    const nuevoProducto = new Product(req.body);
    const productoGuardado = await nuevoProducto.save();
    res.status(201).json(productoGuardado);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al crear el producto', error: error.message });
  }
});

// PUT /api/productos/:id — actualiza un producto existente
router.put('/:id', verificarToken, soloAdmin, async (req, res) => {
  try {
    if (Object.hasOwn(req.body, 'categoria')) {
      const categoria = await Categoria.findById(req.body.categoria);
      if (!categoria) {
        return res.status(400).json({ error: 'La categoría no existe' });
      }
    }

    const productoActualizado = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!productoActualizado) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }
    res.json(productoActualizado);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al actualizar el producto', error: error.message });
  }
});

// DELETE /api/productos/:id — elimina un producto
router.delete('/:id', verificarToken, soloAdmin, async (req, res) => {
  try {
    const productoEliminado = await Product.findByIdAndDelete(req.params.id);
    if (!productoEliminado) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }
    res.json({ mensaje: 'Producto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar el producto', error: error.message });
  }
});

module.exports = router;
