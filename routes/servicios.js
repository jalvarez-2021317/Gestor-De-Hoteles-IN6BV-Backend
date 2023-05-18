const express = require('express');
const { obtenerServicios, crearServicio, actualizarServicio, eliminarServicio } = require('../controllers/servicios');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = express.Router();



router.get('/mostar',validarJWT, obtenerServicios);
router.post('/agregar',validarJWT, crearServicio);
router.put('/editar/:id',validarJWT, actualizarServicio);
router.delete('/delete/:id',validarJWT, eliminarServicio);

module.exports = router;
