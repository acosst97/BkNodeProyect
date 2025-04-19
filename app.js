
const express  = require("express")
const app  = express();
const port  = 3000
// Habilitar JSON en las respuestas
app.use(express.json());

//Conectar a mongose o la base de datos
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
// mongoose.connect("mongodb://localhost:27017/backedNodeProyectBd",{ 
//     useNewUrlParser:true,
//     useUnifiedTopology:true
// }).then(()=> {
//     console.log("Conexion exitosa");
    
// }).catch((error) =>{
   
    
// })



app.listen(port, () => console.log("API corriendo en el puerto" + port));