const Usuario = require('../models/usuario');


// Obtener todos los usuarios
exports.obtenerUsuario = async (req, res) => {
    try {
        const usuarios = await Usuario.find(req.body);
        res.status(200).json(usuarios); 
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener las tareas', error: error.message });
    }
};

exports.crearUsuario = async (req, res) => {
    try {
        const nuevoUser = new Usuario(req.body);
        const usuarioSave = await nuevoUser.save();
        res.status(201).json(usuarioSave); 
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear la tarea', error: error.message });
    }
};