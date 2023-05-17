const express = require('express');
const router = express.Router();
const hotelController = require('../controllers/hotel');
const { validarJWT } = require('../middlewares/validar-jwt');
const esAdminHotel = require('../middlewares/validar-AdminHotel');

// Rutas para manejar hoteles
router.get('/getHotel', hotelController.obtenerHoteles);
router.post('/agregarH', hotelController.crearHotel);
router.put('/editH/:id', hotelController.actualizarHotel);
router.delete('/delH/:id', hotelController.eliminarHotel);
router.get('/habitaciones/disponibles', validarJWT, esAdminHotel, hotelController.contarHabitacionesDisponibles);

module.exports = router;
