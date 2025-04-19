const Tarea = require('../models/tarea');

exports.subirArchivoATarea = async (req, res) => {
    const { tareaId } = req.params;

    if (!req.file) {
        return res.status(400).json({ state: false, mensaje: 'No se recibió ningún archivo.' });
    }

    try {
        const tarea = await Tarea.findById(tareaId);
        if (!tarea) {
        
            const filePath = path.join(__dirname, '../uploads', req.file.filename);
            fs.unlinkSync(filePath);
            return res.status(404).json({ state: false, mensaje: 'Tarea no encontrada.' });
        }

        tarea.imagen = `uploads/${req.file.filename}`; 
        await tarea.save();

        res.json({ state: true, mensaje: 'Archivo cargado y asociado a la tarea.', data: tarea });

    } catch (error) {
        console.error('Error al subir y asociar el archivo:', error);
       
        if (req.file) {
            const filePath = path.join(__dirname, '../uploads', req.file.filename);
            fs.unlinkSync(filePath);
        }
        res.status(500).json({ state: false, mensaje: 'Error al subir y asociar el archivo.', error: error.message });
    }
};