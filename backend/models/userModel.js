// models/user.js
const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    // unique: true,
  },
  mobile: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  token:{
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const UserAddress = sequelize.define('UserAddress', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users', // Assuming your order model is named 'User'
      key: 'id',
    },
  },
  street: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  state: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  postalCode: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  // You can add more fields as needed, such as isDefault for marking the default address, etc.
  // ...
});

User.hasOne(UserAddress, { foreignKey: 'userId', as: 'userAddress' });

UserAddress.belongsTo(User, { foreignKey: 'id' });

// Hash the password before saving the user to the database
// User.beforeCreate(async (user) => {
//   const hashedPassword = await bcrypt.hash(user.password, 10);
//   user.password = hashedPassword;
// });

module.exports = {User,UserAddress};
