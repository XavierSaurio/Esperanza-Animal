const UserController = require('../controllers/user.controller')
//Importa los controladores 
module.exports = function (app, fileupload) {
    //Rutas que se crearon en el servidor con el consumo de APIS.
    app.post('/usuarios/new', fileupload, UserController.createUser);
    app.get('/usuarios', UserController.getAllUsers);
    app.get('/usuarios/:id', UserController.getUser);
    //app.put('/usuarios/:id/', UserController.updateUser);
    //app.delete('/usuarios/:id', UserController.deleteUser);

}