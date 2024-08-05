const mongoose = require('mongoose');

const mascotaSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    nombre: {
        type: String,
        required: true
    },
    tipo: {
        type: String,
        required: true
    },
    raza: {
        type: String,
        required: true
    },
    sexo: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    tamaño: {
        type: String,
        required: true
    },
    personalidad: {
        type: String,
        required: true
    },
    rasgosDistintivos: {
        type: String,
        required: true
    },
    id_duenio: {
        type: String,
        required: true
    },
    fotoMascota: {
        type: String,
        required: true
    }
});

const Mascota = mongoose.model('Mascota', mascotaSchema);

module.exports = Mascota;