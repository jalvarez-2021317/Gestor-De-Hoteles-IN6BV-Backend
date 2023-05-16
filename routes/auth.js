const { Router } = require('express');
const { check } = require('express-validator');
const { login, register } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/login',login);

router.post('/register',register)


module.exports = router;