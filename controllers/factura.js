const { response, request } = require('express');
const Factura = require('../models/factura');
const Reservacion = require('../models/reservacion');
const Servicio = require('../models/servicios');

const getFactura = async (req = request, res = response) => {
  try {
    const listaFactura = await Factura.find()
      .populate('usuario', 'nombre')
      .populate('reserva')
      .populate('servicios.servicio', 'nombre'); // Poblar el campo "servicio" y seleccionar solo la propiedad "nombre"

    res.json({
      msg: 'get api factura',
      listaFactura,
    });
  } catch (error) {
    res.status(500).json({
      error: 'Error al obtener las facturas',
    });
  }
};

const facturarReservacion = async (req = request, res = response) => {
  const { idReserva } = req.params;

  try {
    // Obtener los detalles de la reservación
    const reservacion = await Reservacion.findById(idReserva)
      .populate('usuario', 'nombre')
      .populate('habitacion', 'nombre')
      .populate('servicios.servicio', 'precio'); // Poblar los precios de los servicios

    if (!reservacion) {
      return res.status(404).json({ error: 'Reservación no encontrada' });
    }

    // Calcular el costo total de la estancia
    const costoEstancia = reservacion.habitacion.precio * reservacion.cantidad;

    // Calcular el costo total de los servicios adicionales
    let costoServicios = 0;
    for (const servicio of reservacion.servicios) {
      costoServicios += servicio.servicio.precio * servicio.cantidad;
    }

    // Calcular el costo total de la facturación
    const total = parseFloat(req.body.total);

    // Generar la factura con los detalles de la reservación y los costos asociados
    const facturaData = {
      usuario: reservacion.usuario._id,
      reserva: reservacion._id,
      estado: true,
      total: total // Asigna el valor convertido a "total"
    };

    const factura = new Factura(facturaData);
    await factura.save();

    res.json({ msg: 'Facturación generada', factura });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error al generar la factura' });
  }
};



const postFactura = async (req = request, res = response) => {
  const { estado, ...body } = req.body;

  const data = {
    ...body,
  };

  const factura = new Factura(data);

  await factura.save();

  res.status(201).json({
    msg: 'post api factura',
    factura,
  });
};

const putFactura = async (req = request, res = response) => {
  const { id } = req.params;
  const { _id, rol, estado, ...data } = req.body;

  const factura = await Factura.findByIdAndUpdate(id, data, { estado: true }, { new: true });

  res.json({
    msg: 'put api facturas',
    factura,
  });
};

const deleteFactura = async (req = request, res = response) => {
  const { id } = req.params;

  const factura = await Factura.findByIdAndDelete(id);

  res.json({
    msg: 'delete api facturas',
    factura,
  });
};

module.exports = {
  getFactura,
  postFactura,
  putFactura,
  deleteFactura,
  facturarReservacion
};
