const{Schema, model} = require('mongoose');

const facturaSchema = ({
    usuario: {
        type: Schema.Types.ObjectId,
        require: true,
        ref:"Usuario"
    },
    reserva: {
        type: Schema.Types.ObjectId,
        require: true,
        ref:"Reservacion"
    },
    total: {
        type: Number,
        require: true
    },
    estado: {
        type: Boolean,
        require: true
    }
});

module.exports = model('Factura', facturaSchema);