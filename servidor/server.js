const express = require('express'); //Usar el modulo Express instalado previamente
const app = express(); //Vamos a construir una App Web basada en Express.
const port = 5000; //Puerto del servidor
const cors = require('cors');
//Requerimiento a la configuracion de la BBDD relacional
require('../servidor/config/sequelize.config');
//Definicion de un Endpoint: METODOHTTP + URL 
//Ruta: Constituida por metodo HTTP+ URL+ FUNCION 
//Middlewares:
app.use(cors());
app.use(express.json());
//Trasnformar de JSON a JS
app.use(express.urlencoded({ extended: true }))
//Coge los parametros de :id y lo trasnforma en un objeto de JS con el id de forma numerica
//Para reglas basicas para comunicar en diferentes servidores que no sean por defecto localhost.
const allUserRoutes = require('../servidor/routes/user.routes');
allUserRoutes(app);
//Esuchando el puerto
app.listen(port, ()=>{
    console.log('La aplicacion esta en linea en el puerto', port)
})

//Usando rutas con controladores:
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
app.post('/usuarios/new', function (req, res) {
    console.log(req.body);
    users.push(req.body);
    res.json({ status: "Usuario Añadido" });
})
