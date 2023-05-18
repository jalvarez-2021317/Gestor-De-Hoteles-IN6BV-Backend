const { Schema, model } = require('mongoose');

const facturaSchema = new Schema({
  usuario: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Usuario'
  },
  reserva: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Reservacion'
  },
  servicios: [
    {
      servicio: {
        type: Schema.Types.ObjectId,
        ref: 'Servicio',
        required: true
      },
      cantidad: {
        type: Number,
        required: true
      }
    }
  ],  
  total: {
    type: Number,
    required: true
  },
  estado: {
    type: Boolean,
    required: true
  }
});


module.exports = model('Factura', facturaSchema);
