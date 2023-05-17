const { Schema, model } = require('mongoose');
const Role = require('./role');
const Hotel = require('./hotel')

const usuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'El contraseña es obligatorio']
    },
    rol: {
        type: String,
        required: true,
        ref:Role,
        default : "USER_ROL"
    },
    estado: {
        type: Boolean,
        default: true
    },
    hotel:{
        type:Schema.Types.ObjectId, 
        ref: Hotel,
        require: true
    }
});

module.exports = model('Usuario', usuarioSchema)