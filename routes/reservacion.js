const {Router} = require('express');
const { getReservacion, postReservacion, putReservacion, deleteReservacion } = require('../controllers/reservacion');

const router = Router();

router.get('/', getReservacion);

router.post('/agregar', postReservacion);

router.put('/editar/:id', putReservacion);

router.delete('/eliminar/:id', deleteReservacion);

module.exports = router