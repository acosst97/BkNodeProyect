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

//Cuarto paso ya es crear nuestros modelos y controladores para cada una de nuestras tareas 



Puedes Crear Tareas  Editar tarear y eliminarlas

se crea un modelo Usuario para  crear y listar usuarios


Url para consumo de Api 

**Tareas 
CREAR :  http://localhost:3000/api/tareas
{
    "titulo": "rise up",
    "descripcion": "Nueva cancion electronica 2004",
    "fechaVencimiento": "2025-04-21T10:00:00.000Z",
    "prioridad": "media",
    "completada": false
}  
CREAR ARCHIVO EN UNA TAREA ESPECIFICA :http://localhost:3000/api/uploads/subir-archivo/68032691300f09dca8eaccb6  
En caso de querer agregar un archivo desde postmat se selecciona form-data  y se agrega el id de la tarea creada anteriormente para relacionar la imagen

Editar: http://localhost:3000/api/tareas/68032d47300f09dca8eaccba
Si quieres editar el archivo envias el id de la tarea   y si queires editar otros campso ahi estara tambien 
{
    "descripcion": "Probando Ediciones ",
    "completada": true
}
Eliminar: http://localhost:3000/api/tareas/68032d47300f09dca8eaccba 
envias el id de la tarea que quieres eliminar


/Usuario 
Crear Usuario : http://localhost:3000/api/usuarios  Tipo Post
{
  "nombre": "Harvin Acosta",
  "correoElectronico": "harvin@example.com",
  "contrasena": "miContraseñaSegura123",
  "rol": "usuario"
}

Listar Usuarios: http://localhost:3000/api/usuarios   Tipo Get



//