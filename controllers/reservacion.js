const {response, request} = require('express');

const Reservacion = require('../models/reservacion');

const getReservacion = async (req = request, res = response) => {
    try {
      const query = { estado: true };
      const listaReserva = await Reservacion.find(query)
        .populate("hotel", "nombre") // Poblar el campo "hotel" y seleccionar solo la propiedad "nombre"
        .populate("usuario", "nombre") // Poblar el campo "usuario" y seleccionar solo la propiedad "nombre"
        .populate("habitacion", "nombre"); // Poblar el campo "habitacion" y seleccionar solo la propiedad "nombre"
        
      const reservaciones = listaReserva.map((reservacion) => ({
        _id: reservacion._id,
        hotel: reservacion.hotel.nombre,
        usuario: reservacion.usuario.nombre,
        habitacion: reservacion.habitacion.nombre,
        cantidad: reservacion.cantidad,
        estado: reservacion.estado,
      }));
  
      res.json(reservaciones);
    } catch (error) {
      res.status(500).json({
        error: "Error al obtener las reservaciones",
      });
    }
  };


  const buscarUsuarioHospedado = async (req, res) => {
    try {
      const { usuarioId } = req.params; // Obtén el ID del usuario desde los parámetros de la ruta
      const hotelId = req.usuario.hotel; // Obtén el ID del hotel del Admin desde el token
  
      // Busca una reservación que coincida con el ID del usuario y el ID del hotel del Admin
      const reservacion = await Reservacion.findOne({
        usuario: usuarioId,
        hotel: hotelId
      }).populate('usuario', 'nombre'); // Poblar el campo "usuario" y seleccionar solo la propiedad "nombre"
  
      if (!reservacion) {
        return res.status(404).json({
          message: 'El usuario no está hospedado en este hotel'
        });
      }
  
      res.json(reservacion);
    } catch (error) {
      res.status(500).json({ error: 'Error al buscar el usuario hospedado' });
    }
  };

const obtenerReservacionesHotel = async (req, res) => {
  try {
    const hotelId = req.usuario.hotel; // Obtén el ID del hotel del Admin desde el token

    // Busca todas las reservaciones relacionadas con el hotel del Admin
    const reservaciones = await Reservacion.find({ hotel: hotelId })
      .populate('usuario', 'nombre') // Poblar el campo "usuario" y seleccionar solo la propiedad "nombre"
      .populate('habitacion', 'nombre'); // Poblar el campo "habitacion" y seleccionar solo la propiedad "nombre"

    res.json(reservaciones);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las reservaciones' });
  }
};



  
  

const postReservacion = async (req = request, res = response) =>{
    const {estado, ...body} = req.body;

    const data ={
        ...body
    };

    const reservacion = new Reservacion(data);

    await reservacion.save();

    res.status(201).json({
        msg: 'post api reservacion',
        reservacion
    })
}

const putReservacion = async (req = request, res = response) => {
    const { id } = req.params;
    const { _id, rol, estado, ...data } = req.body;

    const reservacion = await Reservacion.findByIdAndUpdate(id, data, {
        estado: true,
        new: true
    });

    res.json({
        msg: 'Put de reservacion',
        reservacion
    });
}


const deleteReservacion = async (req = request, res = response) =>{
    const {id} = req.params;

    const reservacion = await Reservacion.findByIdAndUpdate(id, {estado: false}, {new: true});

    res.json({
        msg: 'Delete de reservacion',
        reservacion
    })
}


module.exports = {
    getReservacion,
    postReservacion,
    putReservacion,
    deleteReservacion,
    obtenerReservacionesHotel,
    buscarUsuarioHospedado
}