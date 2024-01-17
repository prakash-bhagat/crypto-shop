// models/order.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Carousel = sequelize.define('Carousel', {
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
}
);


module.exports = {Carousel};
