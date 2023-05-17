const { response, request } = require('express');
const Habitacion = require('../models/habitacion');

const getHabitacion = async (req = request, res = response) => {
    try {
        const habitacionesDisponibles = await Habitacion.countDocuments({ estado: 'disponible' });

        res.json({
            msg: 'API de habitaciones - Obtener habitaciones',
            habitacionesDisponibles
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las habitaciones' });
    }
};

const postHabitacion = async (req = request, res = response) => {
    const { usuario, ...body } = req.body;

    try {
        const habitacionEnDB = await Habitacion.findOne({ nombre: body.nombre });

        if (habitacionEnDB) {
            return res.status(400).json({
                msg: `La habitacion ${habitacionEnDB.nombre} ya existe en la base de datos`
            });
        }

        const habitacion = new Habitacion(body);

        await habitacion.save();

        res.json({
            msg: 'API de habitaciones - Crear habitacion',
            habitacion
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la habitacion' });
    }
};

const putHabitacion = async (req = request, res = response) => {
    const { id } = req.params;
    const { _id, usuario, ...data } = req.body;

    if (data.nombre) {
        data.nombre = data.nombre
    }

    try {
        const habitacion = await Habitacion.findByIdAndUpdate(id, data, { new: true });

        res.json({
            msg: 'API de habitaciones - Actualizar habitacion',
            habitacion
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la habitacion' });
    }
};

const deleteHabitacion = async (req = request, res = response) => {
    const { id } = req.params;

    try {
        const habitacion = await Habitacion.findByIdAndDelete(id);

        res.json({
            msg: 'API de habitaciones - Eliminar habitacion',
            habitacion
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la habitacion' });
    }
};

module.exports = {
    getHabitacion,
    postHabitacion,
    putHabitacion,
    deleteHabitacion
};
