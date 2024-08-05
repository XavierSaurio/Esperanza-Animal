const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize.config');

// Crear un modelo SIN EL ESQUEMA
const Animal  = sequelize.define('Animal', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "Nombre es requerido" },
            notEmpty: { msg: "Este campo es obligatorio" }
        }
    },
    tipo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "Tipo es requerido" },
            notEmpty: { msg: "Este campo es obligatorio" }
        }
    },
    raza: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "Raza es requerida" },
            notEmpty: { msg: "Este campo es obligatorio" }
        }
    },
    sexo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "Sexo es requerido" },
            notEmpty: { msg: "Este campo es obligatorio" }
        }
    },
    color: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "Color es requerido" },
            notEmpty: { msg: "Este campo es obligatorio" }
        }
    },
    tamano: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "Tamaño es requerido" },
            notEmpty: { msg: "Este campo es obligatorio" }
        }
    },
    provincia: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "Provincia es requerida" },
            notEmpty: { msg: "Este campo es obligatorio" }
        }
    },
    canton: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "Canton es requerido" },
            notEmpty: { msg: "Este campo es obligatorio" }
        }
    },
    parroquia: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "Parroquia es requerida" },
            notEmpty: { msg: "Este campo es obligatorio" }
        }
    },
    personalidad: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "Personalidad es requerida" },
            notEmpty: { msg: "Este campo es obligatorio" }
        }
    },
    rasgosDistintivos: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "Rasgos distintivos son requeridos" },
            notEmpty: { msg: "Este campo es obligatorio" }
        }
    },
    fotoMascota: {
        type: DataTypes.STRING,
        allowNull: false,
        // validate: {
        //     notNull: { msg: "Foto es requerida" }
        // }
    },
});

module.exports = Animal;
