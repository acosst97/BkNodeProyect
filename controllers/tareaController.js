const Tarea = require('../models/tarea');
const fs = require('fs').promises; 
const path = require('path');

exports.crearTarea = async (req, res) => {
    try {
        const nuevaTarea = new Tarea();
        const tareaGuardada = await nuevaTarea.save();
        res.status(201).json(tareaGuardada); //  Created
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear la tarea', error: error.message });
    }
};

// Obtener todas las tareas
exports.obtenerTareas = async (req, res) => {
    try {
        const tareas = await Tarea.find();
        res.status(200).json(tareas); // 200 OK
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener las tareas', error: error.message });
    }
};

// Obtener una tarea por ID
exports.obtenerTareaPorId = async (req, res) => {
    try {
        const tarea = await Tarea.findById(req.params.id);
        if (!tarea) {
            return res.status(404).json({ mensaje: 'Tarea no encontrada' }); // 404 Not Found
        }
        res.status(200).json(tarea);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener la tarea', error: error.message });
    }
};

// Actualizar una tarea por ID
exports.actualizarTarea = async (req, res) => {
    const { id } = req.params;

    try {
        const tareaExistente = await Tarea.findById(id);
        if (!tareaExistente) {
            return res.status(404).json({ mensaje: 'Tarea no encontrada' });
        }

        let nuevaImagenRuta = tareaExistente.imagen; 

        if (req.file) {
            
            nuevaImagenRuta = `uploads/${req.file.filename}`;

            // Eliminar la imagen anterior si existía
            if (tareaExistente.imagen) {
                const rutaImagenAnterior = path.join(__dirname, '../', tareaExistente.imagen);
                try {
                    await fs.unlink(rutaImagenAnterior);
                    console.log(`Imagen anterior eliminada: ${rutaImagenAnterior}`);
                } catch (error) {
                    console.error(`Error al eliminar la imagen anterior ${rutaImagenAnterior}:`, error);
                }
            }
        }

        const tareaActualizada = await Tarea.findByIdAndUpdate(
            id,
            { ...req.body, imagen: nuevaImagenRuta }, 
            { new: true }
        );

        res.status(200).json(tareaActualizada);

    } catch (error) {
    
        if (req.file) {
            const filePath = path.join(__dirname, '../uploads', req.file.filename);
            try {
                await fs.unlink(filePath);
                console.error(`Archivo subido eliminado debido a error: ${filePath}`);
            } catch (err) {
                console.error(`Error al eliminar archivo fallido ${filePath}:`, err);
            }
        }
        res.status(500).json({ mensaje: 'Error al actualizar la tarea', error: error.message });
    }
};

// Eliminar una tarea por ID
exports.eliminarTarea = async (req, res) => {
    const { id } = req.params;

    try {
        const tarea = await Tarea.findByIdAndDelete(id);

        if (!tarea) {
            return res.status(404).json({ mensaje: 'Tarea no encontrada' });
        }

    
        if (tarea.imagen) {
            const imagePath = path.join(__dirname, '../', tarea.imagen); //ruta completa
            try {
                await fs.unlink(imagePath);
                console.log(`Imagen eliminada: ${imagePath}`);
            } catch (error) {
                console.error(`Error al eliminar la imagen ${imagePath}:`, error);

            }
        }

        res.status(204).send(); // 204 (eliminación exitosa)

    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar la tarea', error: error.message });
    }
};