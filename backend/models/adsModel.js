// models/promocode.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Banner = sequelize.define('Banner', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      position: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
});

module.exports = { Banner };
