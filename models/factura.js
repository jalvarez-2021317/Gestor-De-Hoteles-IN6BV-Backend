const{Schema, model} = require('mongoose');

const facturaSchema = ({
    usuario: {
        type: Schema.Types.ObjectId,
        require: true
    },
    reserva: {
        type: Schema.Types.ObjectId,
        require: true
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