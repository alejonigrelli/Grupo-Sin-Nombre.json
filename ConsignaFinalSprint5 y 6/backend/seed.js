require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');
const Categoria = require('./models/Categoria');
const productosIniciales = require('./data/productos');

const categoriasPorProducto = {
  'Aparador Uspallata': 'Guardado',
  'Biblioteca Recoleta': 'Guardado',
  'Butaca Mendoza': 'Sillones',
  'Sillón Copacabana': 'Sillones',
  'Mesa de Centro Araucaria': 'Mesas',
  'Mesa de Noche Aconcagua': 'Mesas',
  'Sofá Patagonia': 'Sillones',
  'Mesa Comedor Pampa': 'Mesas',
  'Sillas Córdoba': 'Sillas',
  'Escritorio Costa': 'Escritorios',
  'Silla de Trabajo Belgrano': 'Sillas'
};

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Conectado a MongoDB Atlas...');

    let agregados = 0;
    let asignados = 0;
    for (const p of productosIniciales) {
      const nombreCategoria = categoriasPorProducto[p.nombre];
      if (!nombreCategoria) {
        throw new Error(`No hay una categoría configurada para "${p.nombre}"`);
      }

      let categoria = await Categoria.findOne({ nombre: nombreCategoria });
      if (!categoria) {
        categoria = await Categoria.create({ nombre: nombreCategoria });
      }

      const existe = await Product.findOne({ nombre: p.nombre });
      if (!existe) {
        await Product.create({
          nombre: p.nombre,
          descripcion: p.descripcion,
          precio: p.precio,
          stock: 10,
          imagenUrl: p.imagen,
          destacado: p.destacado || false,
          especificaciones: p.especificaciones || {},
          categoria: categoria._id
        });
        agregados++;
      } else if (String(existe.categoria) !== String(categoria._id)) {
        await Product.updateOne(
          { _id: existe._id },
          { $set: { categoria: categoria._id } }
        );
        asignados++;
      }
    }

    const total = await Product.countDocuments();
    console.log(`¡Listo! Se agregaron ${agregados} productos nuevos y se asignaron categorías a ${asignados} existentes. Total en base de datos: ${total}.`);

    await mongoose.disconnect();
    console.log('Desconectado de MongoDB.');
    process.exit(0);
  } catch (error) {
    console.error('Error al sembrar la base de datos:', error.message);
    process.exit(1);
  }
}

seedDatabase();
