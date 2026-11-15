const jwt = require('jsonwebtoken');

function verificarToken(req, res, next) {
  const authorization = req.get('Authorization');
  const coincidencia = authorization && authorization.match(/^Bearer\s+(\S+)$/i);

  if (!coincidencia) {
    return res.status(401).json({ mensaje: 'Token no proporcionado o mal formado' });
  }

  let payload;
  try {
    payload = jwt.verify(coincidencia[1], process.env.JWT_SECRET);
  } catch (error) {
    return res.status(401).json({ mensaje: 'Token inválido o expirado' });
  }

  if (typeof payload !== 'object' || payload === null || typeof payload.id !== 'string') {
    return res.status(401).json({ mensaje: 'Token inválido o expirado' });
  }

  req.usuario = payload;
  return next();
}

function soloAdmin(req, res, next) {
  if (req.usuario && req.usuario.rol === 'admin') {
    return next();
  }

  return res.status(403).json({ mensaje: 'Acceso denegado: se requiere rol admin' });
}

module.exports = { verificarToken, soloAdmin };
