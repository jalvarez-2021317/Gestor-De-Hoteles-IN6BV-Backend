const { Schema, model } = require('mongoose');

const eventSchema = new Schema({
  hotel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hotel',
    required: true
  },
  nombre: {
    type: String,
    required: true
  },
  descripcion: {
    type: String,
    required: true
  },
  fecha: {
    type: Date,
    required: true
  }
});


module.exports = model('Event', eventSchema);
