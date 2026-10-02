import { useState } from 'react';

function ContactForm() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: ''
  });

  const [errores, setErrores] = useState({
    nombre: '',
    email: '',
    mensaje: ''
  });

  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Limpiar error del campo al escribir
    setErrores({
      ...errores,
      [e.target.name]: ''
    });

    // Si ya se habia enviado un mensaje y el usuario empieza a escribir otro,
    // ocultamos el cartel de exito. Si no, queda colgado arriba de un
    // formulario nuevo a medio completar y confunde.
    if (enviado) {
      setEnviado(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevosErrores = { nombre: '', email: '', mensaje: '' };
    let esValido = true;

    if (formData.nombre.trim() === '') {
      nuevosErrores.nombre = 'El nombre es obligatorio.';
      esValido = false;
    }

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email.trim() === '') {
      nuevosErrores.email = 'El email es obligatorio.';
      esValido = false;
    } else if (!regexEmail.test(formData.email.trim())) {
      nuevosErrores.email = 'Ingresa un email valido.';
      esValido = false;
    }

    if (formData.mensaje.trim() === '') {
      nuevosErrores.mensaje = 'El mensaje es obligatorio.';
      esValido = false;
    }

    setErrores(nuevosErrores);

    if (esValido) {
      console.log('Formulario enviado:', formData);
      setEnviado(true);
      setFormData({ nombre: '', email: '', mensaje: '' });
    }
  };

  return (
    <section className="contacto">
      <div className="container">
        <h1 className="seccion__titulo">Contactanos</h1>
        {/*
          noValidate apaga la validacion automatica del navegador.
          Sin esto, un email mal escrito hace que el navegador corte el submit y
          muestre su propio cartel, por lo que handleSubmit nunca llega a correr
          y nuestros mensajes de error en pantalla no se ven nunca.
        */}
        <form className="contacto__formulario" onSubmit={handleSubmit} noValidate>
          <div className="contacto__grupo">
            <label className="contacto__label" htmlFor="nombre">Nombre:</label>
            <input
              className="contacto__input"
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
            />
            {errores.nombre && <span className="contacto__error">{errores.nombre}</span>}
          </div>
          <div className="contacto__grupo">
            <label className="contacto__label" htmlFor="email">Email:</label>
            <input
              className="contacto__input"
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errores.email && <span className="contacto__error">{errores.email}</span>}
          </div>
          <div className="contacto__grupo">
            <label className="contacto__label" htmlFor="mensaje">Mensaje:</label>
            <textarea
              className="contacto__textarea"
              id="mensaje"
              name="mensaje"
              rows={5}
              value={formData.mensaje}
              onChange={handleChange}
            />
            {errores.mensaje && <span className="contacto__error">{errores.mensaje}</span>}
          </div>
          <button className="contacto__boton" type="submit">Enviar Mensaje</button>
        </form>
        {enviado && (
          <div className="contacto__mensaje-exito" style={{ display: 'block' }}>
            ¡Mensaje enviado con exito! Nos pondremos en contacto pronto.
          </div>
        )}
      </div>
    </section>
  );
}

export default ContactForm;
