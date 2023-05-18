const { Schema, model } = require('mongoose');

const servicioSchema = new Schema({
  nombre: {
    type: String,
    required: true
  },
  descripcion: {
    type: String,
    required: true
  },
  precio: {
    type: Number,
    required: true
  },
});

module.exports = model('Servicio', servicioSchema);
