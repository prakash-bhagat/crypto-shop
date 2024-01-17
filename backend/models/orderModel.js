// models/order.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  orderNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  totalAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  orderStatus: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue:'pending',
  },
  // Add other fields as needed, such as customerId, status, createdAt, etc.
  // ...
},
// {
//   sequelize,
//   modelName: 'Order',
//   hooks: {
//     beforeCreate: async (order) => {
//       // Custom logic to generate order number 'CS100', 'CS101', etc.
//       const lastOrder = await Order.findOne({
//         order: [['createdAt', 'DESC']],
//       });

//       let orderNumber;
//       if (lastOrder) {
//         const lastOrderNumber = lastOrder.getDataValue('orderNumber');
//         const lastOrderNumberWithoutPrefix = parseInt(lastOrderNumber.replace('CS', ''), 10);
//         orderNumber = `CS${lastOrderNumberWithoutPrefix + 1}`;
//       } else {
//         // If it's the first order, start with 'CS100'
//         orderNumber = 'CS100';
//       }

//       order.setDataValue('orderNumber', orderNumber);
//     },
//   },
// },
);

const OrderDetails = sequelize.define('OrderDetails', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  orderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'orders', // Assuming your order model is named 'Order'
      key: 'id',
    },
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  productName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  categoryName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  // Add more fields as needed, such as discounts, taxes, etc.
  // ...
});

const OrderPayment = sequelize.define('OrderPayment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  orderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'orders', // Assuming your order model is named 'Order'
      key: 'id',
    },
  },
  paymentMethod: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  transactionId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  transactionStatus: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue:'pending',
  },
  // Add other fields as needed, such as paymentStatus, paymentDate, etc.
  // ...
});

// In your models or somewhere before querying
Order.hasMany(OrderDetails, { foreignKey: 'orderId', as: 'orderDetail' });
Order.hasOne(OrderPayment, { foreignKey: 'orderId', as: 'paymentDetail' });

OrderDetails.belongsTo(Order, { foreignKey: 'id' });
OrderPayment.belongsTo(Order, { foreignKey: 'id' });


module.exports = {Order,OrderDetails,OrderPayment};
