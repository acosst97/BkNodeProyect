const express = require("express");
const app = express();
const  mongoose = require("mongoose");
const port = 3000;
app.use(express.json());
const path = require("path");
const uploadRoutes = require('./routes/uploadRoutes');
const tareaRoutes = require('./routes/tareaRoutes');
const fs = require('fs');

async function conectarDB() {
    try {
        await mongoose.connect("mongodb://localhost:27017/backedNodeProyectBd");
        console.log("Conexión exitosa a MongoDB");
    } catch (error) {
        console.error("Error al conectar a MongoDB:", error);
    }
} 
conectarDB();


// Servir archivos estáticos desde la carpeta 'uploads' (opcional, para acceder a las imágenes desde el navegador)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Usar las rutas de subida de archivos
app.use('/api/uploads', uploadRoutes);

app.use('/api/tareas', tareaRoutes);
app.listen(port, () => console.log("API corriendo en el puerto " + port));
