// config/database.js

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('Loja', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
