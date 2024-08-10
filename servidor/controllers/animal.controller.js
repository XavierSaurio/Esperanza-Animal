const Animal = require('../models/animal.model');

module.exports.createAnimal = async (request, response) => {
    console.log('Body:', request.body);
    console.log('File:', request.file);

    const { nombreAbandonado, tipo, raza, sexo, color, tamano, provincia, canton, parroquia, personalidad, rasgosDistintivos, situacion } = request.body;
    //Para guardar una foto
    const fotoMascota = request.file ? `/imagenes/${request.file.filename}` : null;
    try {
        const animal = await Animal.create({ nombreAbandonado, tipo, raza, sexo, color, tamano, provincia, canton, parroquia, personalidad, rasgosDistintivos, fotoMascota, situacion, estado: 'abandonado' });
        response.json(animal);
    } catch (err) {
        response.status(500).json({ message: 'No se pudo registrar el animal en abandono' });
    }
};

module.exports.getAllAnimals = async (_, response) => {
    try {
        const animals = await Animal.findAll();
        response.json(animals);
    } catch (err) {
        response.status(500).json({ message: 'No se pudieron recuperar los animales en abandono' });
    }
};
