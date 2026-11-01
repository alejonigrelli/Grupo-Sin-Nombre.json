/**
 * @archivo     config.js
 * @modulo      Configuración del cliente
 * @descripcion Centraliza la URL base de la API para no repetirla en cada componente.
 *              En desarrollo apunta al backend local; en producción se define
 *              REACT_APP_API_URL en Vercel/Netlify con la URL del backend en Render.
 * @version     1.0.0
 * @actualizado 2026-10-31
 */

// Se quita la barra final por si la URL se carga como "https://...onrender.com/"
export const API_URL = (process.env.REACT_APP_API_URL || 'http://localhost:5000').replace(/\/$/, '');
