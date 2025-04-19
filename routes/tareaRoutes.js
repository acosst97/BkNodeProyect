const express = require('express');
const router = express.Router();
const tareaController = require('../controllers/tareaController'); // Asegúrate de que la ruta al controlador sea correcta

router.post('/', tareaController.crearTarea);
router.get('/', tareaController.obtenerTareas);
router.get('/:id', tareaController.obtenerTareaPorId);
router.put('/:id', tareaController.actualizarTarea);
router.delete('/:id', tareaController.eliminarTarea);

module.exports = router;