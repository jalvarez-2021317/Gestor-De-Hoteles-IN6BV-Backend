const {response, request} = require('express');

const Reservacion = require('../models/reservacion');

const getReservacion = async(req = request, res = response) =>{
    const query = {estado : true}
    const listaReserva = await Reservacion.find(query).populate('usuario', 'nombre').populate('habitacion', 'nombre');

    res.json({
        msg: 'get api reservacion',
        listaReserva
    })
}

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
    deleteReservacion
}