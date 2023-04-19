const { Schema, model } = require('mongoose');

const habitacionSchema = new Schema({
    nombre: {
        type: String,
        require: true,
        unique: true
    },
    descripcion: {
        type: String,
        require: true
    },
    cantidad: {
        type: Number,
        require: true
    },
    precio: {
        type: Number,
        require: true
    }
});

module.exports = model('Habitacion', habitacionSchema);