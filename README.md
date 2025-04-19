# BkNodeProyect
proyecto  para diplomado universidad iberoamericada

//** PRIMER PASO es  intalar librerias necesarias y los script con express
const express  = require("express")
const app  = express();
const port  = 3000

app.use(express.json());


//**segundo paso en configurar nuestra conexion a base de datos con mongoose 
const  mongoose = require("mongoose");
async function conectarDB() {
    try {
        await mongoose.connect("mongodb://localhost:27017/backedNodeProyectBd");
        console.log("Conexión exitosa a MongoDB");
    } catch (error) {
        console.error("Error al conectar a MongoDB:", error);
    }
}
conectarDB();


//