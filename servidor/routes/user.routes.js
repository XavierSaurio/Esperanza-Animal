const UserController = require('../controllers/user.controller')
const MascotaController = require('../controllers/mascota.controller')
//Importa los controladores 
module.exports = function (app, fileupload,fileupload3) {
    //Rutas que se crearon en el servidor con el consumo de APIS.
    app.post('/usuarios/new', fileupload, UserController.createUser);
    app.get('/usuarios', UserController.getAllUsers);
    app.get('/usuarios/:id', UserController.getUser);
    app.post('/mascotas/new', fileupload3, MascotaController.createMascota);
    app.get('/mascotas', MascotaController.getAllMascotas);
    app.get('/mascotas/:id', MascotaController.getMascota);
    app.put('/mascota/editar/:id', MascotaController.updateMascota)


}