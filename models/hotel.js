const { Schema, model } = require('mongoose');

const hotelSchema = new Schema({
  nombre: {
    type: String,
    required: true
  },
  direccion: {
    type: String,
    required: true
  },
  descripcion: {
    type: String,
    required: true
  },
  administrador: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  }
});


module.exports = model('Hotel', hotelSchema);;
