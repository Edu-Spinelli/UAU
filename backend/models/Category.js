// models/Category.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Category = sequelize.define('Category', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  timestamps: false,
  tableName: 'Categories' // Nome correto da tabela no banco de dados
});

module.exports = Category;
