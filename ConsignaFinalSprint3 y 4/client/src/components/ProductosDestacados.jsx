import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

function ProductosDestacados({ onVerDetalle }) {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    // Si traes los productos de tu backend:
    fetch('http://localhost:5000/api/productos') // o la ruta que usen en su API
      .then(res => res.json())
      .then(data => {
        // Filtramos o tomamos los primeros para destacar
        setProductos(data.slice(0, 4)); 
      })
      .catch(err => console.error("Error cargando destacados:", err));
  }, []);

  return (
    <div className="productos-grilla">
      {productos.map(producto => (
        <ProductCard 
          key={producto.id || producto._id} 
          producto={producto} 
          onVerDetalle={onVerDetalle} 
        />
      ))}
    </div>
  );
}

export default ProductosDestacados;