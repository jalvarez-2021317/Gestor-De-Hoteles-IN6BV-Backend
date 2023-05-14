const {response, request} = require('express');
const Factura = require('../models/factura');

const getFactura = async (req = request, res = response) =>{
    const listaFactura = await Factura.find().populate('usuario', 'nombre');

    res.json({
        msg: 'get api factura',
        listaFactura
    })
};

const postFactura = async (req = request, res = response) =>{
    const {estado, ...body} = req.body;

    const data = {
        ...body
    };

    const factura = new Factura(data);

    await factura.save();

    res.status(201).json({
        msg: 'post api reservacion',
        factura
    })
};

const putFactura = async (req = request, res = response) =>{
    const {id} = req.params;

    const {_id, rol, estado, ...data} = req.body;

    const factura = await Factura.findByIdAndUpdate(id, data, {estado:true}, {new: true});

    res.json({
        msg: 'put api facturas',
        factura
    });
};

const deleteFactura = async (req = request, res = response) =>{
    const {id} = req.params;

    const factura = await Factura.findByIdAndDelete(id);

    res.json({
        msg: 'delete api facturas',
        factura
    })
};

module.exports = {
    getFactura,
    postFactura,
    putFactura,
    deleteFactura
}