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

module.exports = Mascota;const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize.config');
const User = require('../models/user.model')
//Requiere el modelo

//Crear un modelo SIN EL ESQUEMA
const Mascota = sequelize.define('Mascota', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: " Nombre es requerido" }
        }
    },
    tipo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
        notNull: { msg: "Tipo es requerido"}
        }
    },
    raza: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "Raza es requerida" }
        }
    },
    sexo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "Sexo es requerido" }
        }
    },
    color: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "Color es requerido" }
        }
    },
    tamano: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "Tamaño es requerido" },
        }
    },
    personalidad: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "Personalidad es requerida" }
        }
    },
    rasgosDistintivos: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "Rasgos Distintivos es requerido" }
        }
    },
    fotoMascotaUs: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "Foto de Mascota es requerida" }
        }
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User, // Nombre del modelo Usuario
            key: 'id' // Clave primaria a la que se referencia
        },
        allowNull: false,
        validate: {
            notNull: { msg: "El campo usuario es requerido" }
        }
    }
},

{
    timestamps: false,
    freezeTableName:true
}


);
module.exports = Mascota;