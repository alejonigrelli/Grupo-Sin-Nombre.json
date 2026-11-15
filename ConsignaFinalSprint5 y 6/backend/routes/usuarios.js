const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');
const { verificarToken } = require('../middleware/auth');

const router = express.Router();

router.post('/registro', async (req, res, next) => {
  const { nombre, email, password } = req.body || {};

  if (
    typeof nombre !== 'string' ||
    !nombre.trim() ||
    typeof email !== 'string' ||
    !email.trim() ||
    typeof password !== 'string' ||
    !password
  ) {
    return res.status(400).json({ mensaje: 'Nombre, email y password son obligatorios' });
  }

  const emailNormalizado = email.trim().toLowerCase();

  try {
    const existente = await Usuario.findOne({ email: emailNormalizado });
    if (existente) {
      return res.status(409).json({ mensaje: 'El email ya está registrado' });
    }

    const passwordHasheado = await bcrypt.hash(password, 10);
    const usuario = await Usuario.create({
      nombre,
      email: emailNormalizado,
      password: passwordHasheado
    });

    return res.status(201).json({
      _id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
      rol: usuario.rol
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ mensaje: 'El email ya está registrado' });
    }
    return next(error);
  }
});

router.post('/login', async (req, res, next) => {
  const { email, password } = req.body || {};

  if (
    typeof email !== 'string' ||
    !email.trim() ||
    typeof password !== 'string' ||
    !password
  ) {
    return res.status(400).json({ mensaje: 'Email y password son obligatorios' });
  }

  try {
    const usuario = await Usuario.findOne({ email: email.trim().toLowerCase() });
    if (!usuario || !(await bcrypt.compare(password, usuario.password))) {
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }

    const token = jwt.sign(
      { id: usuario._id.toString(), rol: usuario.rol },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.status(200).json({
      token,
      usuario: {
        _id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol
      }
    });
  } catch (error) {
    return next(error);
  }
});

router.get('/perfil', verificarToken, async (req, res, next) => {
  try {
    const usuario = await Usuario.findById(req.usuario.id).select('_id nombre email rol');
    if (!usuario) {
      return res.status(401).json({ mensaje: 'Usuario no encontrado' });
    }

    return res.status(200).json({
      _id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
      rol: usuario.rol
    });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
