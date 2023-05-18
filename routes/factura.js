const {Router} = require('express');
const { getFactura, postFactura, putFactura, deleteFactura, facturarReservacion } = require('../controllers/factura');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', getFactura);

router.post('/agregar', postFactura);
router.post('/facturaReserva/:idReserva', validarJWT, facturarReservacion);


router.put('/editar/:id', putFactura);

router.delete('/eliminar/:id', deleteFactura);

module.exports = router