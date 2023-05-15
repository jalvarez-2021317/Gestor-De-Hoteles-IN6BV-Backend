const { Router } = require('express');
const usuarioController = require('../controllers/Usuario');
const dbValidators = require('../helpers/db-validator');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole } = require('../middlewares/validar-roles');
const { check } = require('express-validator');

const { getUsuarios, postUsuario, putUsuario, deleteUsuario } = usuarioController;
const { emailExiste, esRoleValido, existeUsuarioPorId } = dbValidators;

const router = Router()
    .get('/mostrar', getUsuarios)
    .post('/agregar', [
        check('nombre', 'El nombre es obligatorio para el post').not().isEmpty(),
        check('password', 'La password es obligatorio para el post').not().isEmpty(),
        check('password', 'La passwarod debe ser mayor a 6 letras').isLength({ min: 6 }),
        check('correo', 'El correo no es valido').isEmail(),
        check('correo').custom( emailExiste ),
        check('rol', 'El rol es obligatorio para el post').not().isEmpty(),
        check('rol').custom( esRoleValido )
    ], postUsuario)
    .put('/editar/:id',[
        check('id', 'No es un ID valido').isMongoId(),
        check('id').custom( existeUsuarioPorId ),
        check('correo', 'El correo no es valido').isEmail(),
        check('correo').custom( emailExiste ),
        check('password', 'La password es obligatorio para el post').not().isEmpty(),
        check('password', 'La passwarod debe ser mayor a 6 letras').isLength({ min: 6 }),
        check('rol').custom( esRoleValido )
    ], putUsuario)
    .delete('/eliminar/:id', [
        validarJWT,
        esAdminRole,
        check('id', 'No es un ID valido').isMongoId(),
        check('id').custom( existeUsuarioPorId )
    ] ,deleteUsuario);

module.exports = router;
