const mongoose = require('mongoose');

const tareaSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true,
        trim: true
    },
    descripcion: {
        type: String,
        trim: true,
        default: ''
    },
    completada: {
        type: Boolean,
        default: false
    },
    fechaCreacion: {
        type: Date,
        default: Date.now
    },
    fechaVencimiento: {
        type: Date
    },
    prioridad: {
        type: String,
        enum: ['alta', 'media', 'baja'],
        default: 'media'
    },
    imagen: {
        type: String
    }
    // Si decides crear un modelo Imagen:
    // imagen: { type: mongoose.Schema.Types.ObjectId, ref: 'Imagen' }
});

const Tarea = mongoose.model('Tarea', tareaSchema);

module.exports = Tarea;