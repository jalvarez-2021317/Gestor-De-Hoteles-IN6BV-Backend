const { Schema, model } = require('mongoose');

const reservacionSchema = new Schema({
  usuario: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  habitacion: {
    type: Schema.Types.ObjectId,
    ref: 'Habitacion',
    required: true
  },
  cantidad: {
    type: Number,
    required: true
  },
  estado: {
    type: Boolean,
    required: true,
    default: true
  },
  hotel: {
    type: Schema.Types.ObjectId,
    ref: 'Hotel',
    required: true
  },
  servicios: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Servicio'
    }
  ]
});

module.exports = model('Reservacion', reservacionSchema);
