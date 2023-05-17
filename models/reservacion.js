const { Schema, model } = require('mongoose');

const reservacionSchema = new Schema({
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario', // Referencia al modelo 'Usuario'
        required: true
    },
    habitacion: {
        type: Schema.Types.ObjectId,
        ref: 'Habitacion', // Referencia al modelo 'Habitacion'
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
        ref: 'Hotel', // Referencia al modelo 'Hotel'
        required: true
    }
});

module.exports = model('Reservacion', reservacionSchema);
