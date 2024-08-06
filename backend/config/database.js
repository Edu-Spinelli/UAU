// config/database.js

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('Loja', 'root', '18637859', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
