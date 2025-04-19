const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController'); // Asegúrate de que la ruta al controlador sea correcta

router.post('/', usuarioController.crearUsuario);
router.get('/', usuarioController.obtenerUsuario);

module.exports = router;