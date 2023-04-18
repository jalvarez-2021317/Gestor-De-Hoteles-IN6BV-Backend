const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');

const getUsuarios = async ({query}, res) => {
    const listaUsuarios = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
    ]);
    res.json({msg: 'GET API de usuarios', listaUsuarios});
}

const postUsuario = async ({body}, res) => {
    const salt = bcryptjs.genSaltSync();
    const usuarioDB = new Usuario({...body, password: bcryptjs.hashSync(body.password, salt)});
    await usuarioDB.save();
    res.status(201).json({msg: 'POST API de usuario', usuarioDB});
}

const putUsuario = async ({params, body}, res) => {
    const salt = bcryptjs.genSaltSync();
    const usuarioEditado = await Usuario.findByIdAndUpdate(params.id, {...body, password: bcryptjs.hashSync(body.password, salt)});
    res.json({msg: 'PUT API de usuario', usuarioEditado});
}

const deleteUsuario = async ({params}, res) => {
    const usuarioEliminado = await Usuario.findByIdAndDelete(params.id);
    res.json({msg: 'DELETE API de usuario', usuarioEliminado});
}

module.exports = {
    getUsuarios,
    postUsuario,
    putUsuario,
    deleteUsuario
}