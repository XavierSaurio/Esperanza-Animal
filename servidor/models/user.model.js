const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize.config');
//Requiere el modelo

//Crear un modelo SIN EL ESQUEMA
const User = sequelize.define('User', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: " Nombre es requerido" }
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
        notNull: { msg: "Correo Electronico es requerido"}
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "Contraseña es requerida" }
        }
    },
    celular: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: { msg: "Celular es requerida" }
        }
    },
    provincia: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "Provincia es requerida" }
        }
    },
    canton: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "Canton es requerido" }
        }
    },
    parroquia: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "Parroquia es requerida" }
        }
    },
    fotoPerfil: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "Foto es requerida" }
        }
    },

});
module.exports = User;