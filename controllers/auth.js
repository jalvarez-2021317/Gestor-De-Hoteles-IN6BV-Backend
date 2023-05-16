const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');

const login = async (req = request, res = response) => {
    const { correo, password } = req.body;

    try {
        const usuario = await Usuario.findOne({ correo });

        if (!usuario) return res.status(404).json({ msg: 'Correo de usuario no existe en la base de datos 404' });
        if (!usuario.estado) return res.status(400).json({ msg: 'La cuenta del usuario está inactiva' });

        const validarPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validarPassword) return res.status(400).json({ msg: 'La contraseña es incorrecta' });

        const token = await generarJWT(usuario.id);
        res.json({ msg: '¡Login Auth Funciona!', correo, password, token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Hable con el admin' });
    }
};

const register = async (req = request, res = response) => {
    const { correo, password } = req.body;

    try {
        // Verificar si el usuario ya existe
        const usuarioExistente = await Usuario.findOne({ correo });
        if (usuarioExistente) {
            return res.status(400).json({ msg: 'El correo ya está registrado' });
        }

        const usuario = new Usuario(req.body);

        // Encriptar contraseña
        const salt = bcryptjs.genSaltSync();
        usuario.password = bcryptjs.hashSync(password, salt);

        // Guardar en la base de datos
        await usuario.save();

        // Generar JWT
        const token = await generarJWT(usuario.id);

        res.json({ msg: '¡Registro exitoso!', correo, password, token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Hable con el admin' });
    }
};


module.exports = { login, register };


