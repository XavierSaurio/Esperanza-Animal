const UserController = require('../controllers/user.controller')
const MascotaController = require('../controllers/mascota.controller')
const animalController = require('../controllers/animal.controller');
//Importa los controladores 
module.exports = function (app, fileupload, fileupload2,fileupload3) {
    //Rutas que se crearon en el servidor con el consumo de APIS.
    app.post('/usuarios/new', fileupload, UserController.createUser);
    app.get('/usuarios', UserController.getAllUsers);
    app.get('/usuarios/:id', UserController.getUser);
    //Para mascotas
    app.post('/mascotas/new', fileupload3, MascotaController.createMascota);
    app.get('/mascotas', MascotaController.getAllMascotas);
    app.get('/mascotas/:id', MascotaController.getMascota);
    app.put('/mascota/editar/:id', MascotaController.updateMascota)
    //para animales abandono
    app.post('/animal', fileupload2, animalController.createAnimal);
    app.get('/animal', animalController.getAllAnimals);
    app.get('/animal/:id', animalController.getAnimalById); // Ruta para obtener un animal por su ID
}