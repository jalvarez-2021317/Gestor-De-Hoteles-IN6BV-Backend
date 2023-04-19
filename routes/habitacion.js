const {Router} = require('express');
const { getHabitacion, postHabitacion, putHabitacion, deleteHabitacion } = require('../controllers/habitacion');

const router = Router();

router.get('/', getHabitacion);

router.post('/agregar', postHabitacion);

router.put('/editar/:id', putHabitacion);

router.delete('/eliminar/:id', deleteHabitacion)

module.exports = router