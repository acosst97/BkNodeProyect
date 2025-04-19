const express = require("express");
const app = express();
const  mongoose = require("mongoose");
const port = 3000;
app.use(express.json());
const path = require("path");
const uploadRoutes = require('./routes/uploadRoutes');
const tareaRoutes = require('./routes/tareaRoutes');
const usuarioRoutes = require('./routes/UsuarioRoutes')
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
// async function desconectar(){
//     mongoose.connection.close(); // Cerrar la conexión
//     console.log("desconectado");
// }
// desconectar()


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// rutas subida de archivos
app.use('/api/uploads', uploadRoutes);

app.use('/api/tareas', tareaRoutes);
app.use('/api/usuarios', usuarioRoutes)
app.listen(port, () => console.log("API corriendo en el puerto " + port));
