const Usuario = require('../models/usuario');

const esAdminHotel = async (req, res, next) => {
  try {
    const usuario = req.usuario;

    if (usuario.rol === 'ADMIN_HOTEL') {
      next();
    } else {
      return res.status(403).json({
        msg: 'Acceso denegado. No tienes los permisos necesarios como Administrador de Hotel.',
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: 'Error al verificar los permisos de administrador de hotel.',
    });
  }
};

module.exports = esAdminHotel;
