const express = require('express');
const router = express.Router();
const tareaController = require('../controllers/tareaController'); 
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); 
    },
    filename: (req, file, cb) => {
        const timestamp = Date.now();
        cb(null, `${timestamp}-${file.originalname}`)
    }
});

const fileFilter = (req, file, cb) => {
    const extensionSuport = [".jpg", ".jpeg", ".png", ".gif"];
    const ext = path.extname(file.originalname).toLocaleLowerCase();
    if (extensionSuport.includes(ext)) {
        cb(null, true);
    } else {
        cb({ mensaje: "archivo no autorizado solo soporta " + extensionSuport.join(" | ") }, false);
    }
};

const uploads = multer({ storage, fileFilter }).single("archivo")

router.post('/', tareaController.crearTarea);
router.get('/', tareaController.obtenerTareas);
router.get('/:id', tareaController.obtenerTareaPorId);
router.put('/:id', uploads, tareaController.actualizarTarea); // 
router.delete('/:id', tareaController.eliminarTarea);

module.exports = router;