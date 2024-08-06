// models/Perfume.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Perfume = sequelize.define('Perfume', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
}, {
  timestamps: false,
});

module.exports = Perfume;
