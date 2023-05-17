const { Schema, model } = require('mongoose');

const habitacionSchema = new Schema({
  nombre: {
    type: String,
    required: true
  },
  precio: {
    type: Number,
    required: true
  },
  estado: {
    type: String,
    enum: ['disponible', 'ocupada', 'mantenimiento'],
    default: 'disponible'
  },
  hotel: {
    type: Schema.Types.ObjectId,
    ref: 'Hotel',
    required: true
  }
});

module.exports = model('Habitacion', habitacionSchema);
