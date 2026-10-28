require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');
const productosIniciales = require('./data/productos');

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Conectado a MongoDB Atlas...');

    let agregados = 0;
    for (const p of productosIniciales) {
      const existe = await Product.findOne({ nombre: p.nombre });
      if (!existe) {
        await Product.create({
          nombre: p.nombre,
          descripcion: p.descripcion,
          precio: p.precio,
          stock: 10,
          imagenUrl: p.imagen,
          destacado: p.destacado || false,
          especificaciones: p.especificaciones || {}
        });
        agregados++;
      }
    }

    const total = await Product.countDocuments();
    console.log(`¡Listo! Se agregaron ${agregados} productos nuevos. Total en base de datos: ${total}.`);

    await mongoose.disconnect();
    console.log('Desconectado de MongoDB.');
    process.exit(0);
  } catch (error) {
    console.error('Error al sembrar la base de datos:', error.message);
    process.exit(1);
  }
}

seedDatabase();
