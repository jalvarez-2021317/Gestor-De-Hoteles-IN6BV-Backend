const {response, request} = require('express');

const Reserva = require('../models/reservacion');

const getReservacion = async(req = request, res = response) =>{
    const query = {estado : true}
    const listaReserva = await Reserva.find(query).populate('usuario', 'nombre').populate('habitacion', 'nombre');

    res.json({
        msg: 'get api reservacion',
        listaReserva
    })
}

const postReservacion = async (req = request, res = response) =>{
    const {estado, usuario, ...body} = req.body;

    const data ={
        ...body,
        usuario: req.usuario._id,
        habitacion: req.habitacion._id,
        hotel: req.hotel._id
    };

    const reservacion = new Reservacion(data);

    await reservacion.save();

    res.status(201).json({
        msg: 'post api reservacion',
        reservacion
    })
}

const putReservacion = async(req = request, res = response) =>{
    const {id} = req.params;

    const {_id, rol, estado, ...data} = req.body;

    data.usuario = req.usuario._id;
    data.habitacion = req.habitacion._id;
    data.hotel = req.hotel._id;

    const reservacion = await Reserva.findByIdAndUpdate(id, data, {estado: true}, {new: true});

    res.json({
        msg: 'Put de categoria',
        reservacion
    });
}

module.exports = {
    getReservacion,
    postReservacion
}