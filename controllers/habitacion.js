const {response, request} = require('express');

const Habitacion = require('../models/habitacion');

const getHabitacion = async (req = request, res = response) =>{
    const listaHabitaciones = await Promise.all([
        Habitacion.countDocuments(),
        Habitacion.find()
    ]);

    res.json({
        msg: 'Get API de habitaciones',
        listaHabitaciones
    })
}

const postHabitacion = async (req = request, res= response) =>{
    const {usuario, ...body} = req.body

    const habitacionEnDB = await Habitacion.findOne({nombre: body.nombre});

    if (habitacionEnDB) {
        return res.status(400).json({
            msg: `La habitacion ${habitacionEnDB.nombre} ya existe en la base de datos`
        })
    }

    const data = {
        ... body,
        nombre: body.nombre
    }

    const habitacion = new Habitacion(data);

    await habitacion.save();

    res.json({
        msg: 'Post API de habitaciones',
        habitacion
    })
}

const putHabitacion = async (req = request, res = response) =>{
    const {id} = req.params;
    const {_id, usuario, ...data} = req.body;

    if (data.nombre) {
        data.nombre = data.nombre
    }

    const habitacion = await Habitacion.findByIdAndUpdate(id, data);

    res.json({
        msg: 'Put API de habitaciones',
        habitacion
    })
}

const deleteHabitacion = async (req = request, res = response) =>{
    const {id} = req.params;

    const habitacion = await Habitacion.findByIdAndDelete(id);

    res.json({
        msg: 'Delete API de habitaciones',
        habitacion
    })
}

module.exports= {
    getHabitacion,
    postHabitacion,
    putHabitacion,
    deleteHabitacion
}