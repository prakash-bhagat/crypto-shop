// models/promocode.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const PromoCode = sequelize.define('PromoCode', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    discount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            min: 0,
            max: 100,
        },
    },
});

module.exports = { PromoCode };
