// config/database.js

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('loja_perfumes', 'root', 'pass', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
