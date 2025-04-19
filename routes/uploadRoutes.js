const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // carpeta destino
    },
    filename: (req, file, cb) => {
        const timestamp = Date.now();
        cb(null, `${timestamp}-${file.originalname}`)
    }
})

const fileFilter = (req, file, cb) => {
    const extensionSuport = [".jpg", ".jpeg", ".png", ".gif"];
    const ext = path.extname(file.originalname).toLocaleLowerCase();
    if (extensionSuport.includes(ext)) {
        cb(null, true);
    } else {
        cb({ mensaje: "archivo no autorizado solo soporta " + extensionSuport.join(" | ") }, false);
    }
};

const uploads = multer({ storage, fileFilter }).single("archivo");

router.post("/subir-archivo/:tareaId", uploads, uploadController.subirArchivoATarea);

module.exports = router;