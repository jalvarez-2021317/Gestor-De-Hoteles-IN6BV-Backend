const {Router} = require('express');
const { getReservacion, postReservacion, putReservacion, deleteReservacion, obtenerReservacionesHotel, buscarUsuarioHospedado, cancelarReservacion } = require('../controllers/reservacion');
const { validarJWT } = require('../middlewares/validar-jwt');
const esAdminHotel = require('../middlewares/validar-AdminHotel');

const router = Router();

router.get('/', getReservacion);
router.get('/reservaciones', validarJWT, esAdminHotel, obtenerReservacionesHotel);
router.get('/hotel/usuario/:usuarioId', validarJWT, esAdminHotel, buscarUsuarioHospedado);
router.put('/:idReservacion/cancelar',validarJWT,esAdminHotel, cancelarReservacion)

router.post('/agregar', validarJWT, esAdminHotel, postReservacion);

router.put('/editar/:id', putReservacion);

router.delete('/eliminar/:id', deleteReservacion);

module.exports = router