const mongoose = require('mongoose');
const usuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true 
    },
    correoElectronico: {
        type: String,
        required: true,
        unique: true, 
        trim: true, 
        lowercase: true 
    },
    contrasena: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        enum: ['admin', 'usuario'], 
        default: 'usuario' 
    }
}, {
    timestamps: true // agrega automáticamente los campos createdAt y updatedAt
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;