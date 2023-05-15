const express = require('express');
const router = express.Router();
const hotelController = require('../controllers/hotel');

// Rutas para manejar hoteles
router.get('/getHotel', hotelController.obtenerHoteles);
router.post('/agregarH', hotelController.crearHotel);
router.put('/editH/:id', hotelController.actualizarHotel);
router.delete('/delH/:id', hotelController.eliminarHotel);

module.exports = router;
