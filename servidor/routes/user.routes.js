const UserController = require('../controllers/user.controller')
const animalController = require('../controllers/animal.controller');
//Importa los controladores 
module.exports = function (app, fileupload, fileupload2) {
    //Rutas que se crearon en el servidor con el consumo de APIS.
    app.post('/usuarios/new', fileupload, UserController.createUser);
    app.get('/usuarios', UserController.getAllUsers);
    app.get('/usuarios/:id', UserController.getUser);
    //app.put('/usuarios/:id/', UserController.updateUser);
    //app.delete('/usuarios/:id', UserController.deleteUser);
    //para animales abandono
    app.post('/animal', fileupload2, animalController.createAnimal);
    app.get('/animal', animalController.getAllAnimals);
    app.get('/animal/:id', animalController.getAnimalById); // Ruta para obtener un animal por su ID
}