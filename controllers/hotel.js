const Hotel = require('../models/hotel');
const Habitacion = require('../models/habitacion');

const hotelController = {};

// Obtener todos los hoteles
hotelController.obtenerHoteles = async (req, res) => {
  try {
    const hoteles = await Hotel.find();
    res.json(hoteles);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Hubo un error al obtener los hoteles'
    });
  }
};

// Crear un nuevo hotel
hotelController.crearHotel = async (req, res) => {
  const { nombre, direccion, descripcion, administrador } = req.body;
  const hotel = new Hotel({ nombre, direccion, descripcion, administrador });

  try {
    await hotel.save();
    res.json(hotel);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Hubo un error al crear el hotel'
    });
  }
};

// Actualizar un hotel existente
hotelController.actualizarHotel = async (req, res) => {
  const { id } = req.params;
  const { nombre, direccion, descripcion, administrador } = req.body;

  try {
    const hotel = await Hotel.findByIdAndUpdate(
      id,
      { nombre, direccion, descripcion, administrador },
      { new: true }
    );
    res.json(hotel);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Hubo un error al actualizar el hotel'
    });
  }
};

hotelController.contarHabitacionesDisponibles = async (req, res) => {
  try {
    const hotelId = req.usuario.hotel; // Obtén el ID del hotel del Admin desde el token

    // Utiliza el método countDocuments de Mongoose para contar las habitaciones disponibles en el hotel
    const habitacionesDisponibles = await Habitacion.countDocuments({ hotel: hotelId, estado: 'disponible' });

    res.json({ cantidad: habitacionesDisponibles });
  } catch (error) {
    res.status(500).json({ error: 'Error al contar las habitaciones disponibles' });
  }
};

// Eliminar un hotel existente
hotelController.eliminarHotel = async (req, res) => {
  const { id } = req.params;

  try {
    await Hotel.findByIdAndDelete(id);
    res.json({ msg: 'Hotel eliminado correctamente' });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Hubo un error al eliminar el hotel'
    });
  }
};

module.exports = hotelController;
