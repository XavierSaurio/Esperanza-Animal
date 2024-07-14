const { Sequelize } = require('sequelize');

const username = 'root';
const password = 'diego';
const bdd_name = 'esperanzaAnimal';
const hostName = 'localhost';

// Conexión inicial sin especificar la base de datos
const initialSequelize = new Sequelize(`mysql://${username}:${password}@${hostName}`);

initialSequelize.query(`CREATE DATABASE IF NOT EXISTS ${bdd_name};`)
    .then(() => console.log('BDD creada o ya existía'))
    .catch((error) => {
        console.error('Error al crear la BDD', error);
        process.exit(1); // Termina el proceso si hay un error
    });

// Conectar a la base de datos específica y sincronizar modelos
const sequelize = new Sequelize(bdd_name, username, password, {
    host: hostName,
    dialect: 'mysql'
});

// Se sincroniza los modelos con la base de datos
sequelize.sync().then(() => {
    console.log('Base de datos sincronizada');
}).catch(err => {
    console.log('Error al sincronizar la BDD', err);
});
module.exports = sequelize;