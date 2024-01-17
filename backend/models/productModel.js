// models/product.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
// const Category = require('./categoryModel');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  }, 
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    // references: {
    //   model: 'categories', 
    //   key: 'id',
    // },
  },
  // Add other fields as needed (e.g., category, ratings, reviews, etc.)
  // ...
});

const Category = sequelize.define('Category', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  cat_url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // You can add more fields as needed, such as imageUrl, parentId for hierarchical categories, etc.
  // ...
});

// Define associations
Product.belongsTo(Category, {
  foreignKey: {
    name: 'categoryId',
    allowNull: false,
  },
});


module.exports = {Product,Category};
