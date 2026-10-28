const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String },
  precio: { type: Number, required: true },
  stock: { type: Number, default: 10 },
  imagenUrl: { type: String },
  destacado: { type: Boolean, default: false },
  especificaciones: { type: mongoose.Schema.Types.Mixed }
});

module.exports = mongoose.model('Product', productSchema);
