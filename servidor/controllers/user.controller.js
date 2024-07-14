const User = require('../models/user.model');

module.exports.createUser = async (request, response) => {
    const { nombre, email, password, celular, provincia, canton, parroquia, fotoPerfil } = request.body;
    try {
        const user = await User.create({ nombre, email, password, celular, provincia, canton, parroquia, fotoPerfil });
        response.json(user);
    } catch (err) {
        response.status(500).json({ message: 'No se pudo crear el usuario' }); //response.status(500).json(err) -----PELIGRO POR SEGURIDAD;
    }
};

module.exports.getAllUsers = async (_, response) => {
    try {
        const users = await User.findAll();
        response.json(users);
    } catch (err) {
        response.status(500).json({ message: 'No se pudo encontrar los usuarios' });
    }
};

module.exports.getUser = async (request, response) => {
    try {
        const user = await User.findOne({ where: { id: request.params.id } }); response.json(user);
    } catch (err) {
        response.status(500).json({ message: 'No se pudo encontrar el usuario' });
    }
};

/*module.exports.updateUser = async (request, response) => {
    try {
        // Se actualiza el usuario
        const [updatedRowCount] = await User.update(request.body, {
            where: { id: request.params.id }
        });
        
        // Se verifica si se ha actualizado algún registro
        if (updatedRowCount) {
            // Recupera la información actualizada del usuario
            const updatedUser = await User.findOne({ where: { id: request.params.id } }); response.json(updatedUser);
            
        } else {
            response.status(404).json({ message: "Usuario no encontrado" });
        }
    } catch (err) {
        response.status(500).json({ message: 'No se pudo actualizar el usuario' });
    }
};

module.exports.deleteUser = async (request, response) => {
    try {
        const user = await User.findOne({ where: { id: request.params.id } }); if (!user) {
            return response.status(404).json({ message: "Usuario no encontrado" });
        }
        await User.destroy({ where: { id: request.params.id } });
        response.json(user);
    } catch (err) {
        response.status(500).json({ message: 'No se pudo eliminar el usuario' });
    }
};*/