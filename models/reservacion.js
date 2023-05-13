const {Schema, model} = require('mongoose');

const reservacionSchema = ({
    usuario: {
        type: Schema.Types.ObjectId,
        require: true
    },
    habitacion: {
        type: Schema.Types.ObjectId,
        require: true
    },
    cantidad: {
        type: Number,
        require: true
    },
    estado: {
        type: Boolean,
        require: true,
        default: true
    },
    hotel:{
        type: Schema.Types.ObjectId,
        require: true
    }
});

module.exports = model('Reservacion', reservacionSchema)