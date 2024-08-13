const express = require('express'); //Usar el modulo Express instalado previamente
const app = express(); //Vamos a construir una App Web basada en Express.
const port = 5000; //Puerto del servidor
const cors = require('cors');
const multer = require('multer');
const path = require('path');
//Requerimiento a la configuracion de la BBDD relacional
require('../servidor/config/sequelize.config');
//Definicion de un Endpoint: METODOHTTP + URL 
//Ruta: Constituida por metodo HTTP+ URL+ FUNCION 
//Middlewares:
app.use(cors());
app.use(express.json({ limit: '50mb' }));
//Trasnformar de JSON a JS
app.use(express.urlencoded({ limit: '50mb', extended: true }));
//Coge los parametros de :id y lo trasnforma en un objeto de JS con el id de forma numerica
//Para reglas basicas para comunicar en diferentes servidores que no sean por defecto localhost.
//Esto es para que nustras imagenes se pueden acceder de forma estatica con el gestor de archivos
app.use('/imagenes', express.static(path.join(__dirname, '../imagenes')));
//Configuracion de Multer
const disktorage = multer.diskStorage({
    
    destination: path.join(__dirname, '../imagenes'),
    filename: (req, file, cb) =>{
        cb(null,Date.now()+'-' + file.originalname)
    } 
})
///mascota
const disktorage2 = multer.diskStorage({
    
    destination: path.join(__dirname, '../imagenes'),
    filename: (req, file, cb) =>{
        cb(null,Date.now()+'-' + file.originalname)
    } 
})
//Es para registrar la imagen de un USUARIO 
const fileupload = multer({
    storage: disktorage
}).single('fotoPerfil')

//Para registrar la mascota 
const fileupload2 = multer({
    storage: disktorage2
}).single('fotoMascota')




const allUserRoutes = require('../servidor/routes/user.routes');
allUserRoutes(app, fileupload, fileupload2);
//Esuchando el puerto
app.listen(port, () => {
    console.log('La aplicacion esta en linea en el puerto', port)
})
//Usando rutas con controladores:

//ENDPOINTS PARA USUARIOS

//PETICION OBTENER TODOS LOS USUARIOS
app.get('/usuarios', function (req, res) {
    res.json(users);
})
//PETICION GET CON UN PARAMETRO ESPECIFICO
app.get('/usuarios/:id', function (req, res) {

    const userId = req.params.id;
    const user = users.find(user => user.id === userId);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ error: 'Usuario no encontrado' });
    }
})
//PETICION POST
app.post('/usuarios/new', fileupload, async (req, res) => {
    console.log(req.body);
    users.push(req.body);
    if(users){
        res.json({ status: "Añadido" })
    }else{
        res.status(404).json({ error: 'Usuario no creado' });
    }
});

// Use routes



app.post('/animal', fileupload2, async (req, res) => {
    console.log(req.body);
    animals.push(req.body);
    if(animals){
        res.json({ status: "Añadido" })
    }else{
        res.status(404).json({ error: 'Usuario no creado' });
    }
});
app.get('/animal', function (req, res) {
    res.json(animals);
})