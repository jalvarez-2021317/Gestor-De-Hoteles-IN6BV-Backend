const Servicio = require('../models/servicios');

// Obtener todos los servicios
const obtenerServicios = async (req, res) => {
  try {
    const servicios = await Servicio.find();
    res.json(servicios);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: 'Error al obtener los servicios'
    });
  }
};

// Crear un nuevo servicio
const crearServicio = async (req, res) => {
  const { nombre, descripcion, precio } = req.body;
  const servicio = new Servicio({ nombre, descripcion, precio });

  try {
    await servicio.save();
    res.json(servicio);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: 'Error al crear el servicio'
    });
  }
};

// Actualizar un servicio existente
const actualizarServicio = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, precio } = req.body;

  try {
    const servicio = await Servicio.findByIdAndUpdate(
      id,
      { nombre, descripcion, precio },
      { new: true }
    );
    res.json(servicio);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: 'Error al actualizar el servicio'
    });
  }
};

// Eliminar un servicio existente
const eliminarServicio = async (req, res) => {
  const { id } = req.params;

  try {
    await Servicio.findByIdAndDelete(id);
    res.json({ msg: 'Servicio eliminado correctamente' });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: 'Error al eliminar el servicio'
    });
  }
};

module.exports = {
  obtenerServicios,
  crearServicio,
  actualizarServicio,
  eliminarServicio
};
