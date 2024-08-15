const Mascota = require('../models/mascota.model');


module.exports.createMascota = async (req, res) => {
    const { nombre, tipo, raza, sexo, color, tamano, personalidad, rasgosDistintivos, userId } = req.body;
    const fotoMascotaUs = req.file ? `/imagenes/${req.file.filename}` : null;
    
    if (tamano === undefined || tamano === null) {
        return res.status(400).json({ message: 'El tamaño es requerido y no puede ser nulo o indefinido' });
    }

    try {
        const mascota = await Mascota.create({
            nombre, tipo, raza, sexo, color, tamano, personalidad, rasgosDistintivos, fotoMascotaUs, userId
        });
        res.json(mascota);
        console.log(res);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'No se pudo crear la mascota' });
    }
};


module.exports.getAllMascotas = async (_, response) => {
    try {
        const mascotas = await Mascota.findAll();
        response.json(mascotas);
    } catch (err) {
        console.error(err);
        response.status(500).json({ message: 'No se pudo encontrar las mascotas' });
    }
};

module.exports.getMascota = async (request, response) => {
    try {
        const mascota = await Mascota.findOne({ where: { id: request.params.id } }); response.json(mascota);
    } catch (err) {
        console.error(err);
        response.status(500).json({ message: 'No se pudo encontrar la mascota' });
    }
};

module.exports.updateMascota = async (request, response) => {
    try {
        // Se actualiza el usuario
        const [updatedRowCount] = await Mascota.update(request.body, {
            where: { id: request.params.id }
        });
        
        // Se verifica si se ha actualizado algún registro
        if (updatedRowCount) {
            // Recupera la información actualizada del usuario
            const updatedUser = await Mascota.findOne({ where: { id: request.params.id } }); response.json(updatedUser);
            
        } else {
            response.status(404).json({ message: "Mascota no encontrada" });
        }
    } catch (err) {
        response.status(500).json({ message: 'No se pudo actualizar la mascota' });
    }
};
