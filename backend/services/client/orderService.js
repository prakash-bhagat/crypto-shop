// orderModel.js
const mysql = require('mysql');
const config = require('../config');

const pool = mysql.createPool(config.db);

function getAllOrders() {
  return pool.promise().query('SELECT * FROM orders');
}

function getOrderById(orderId) {
  return pool.promise().query('SELECT * FROM orders WHERE id = ?', [orderId]);
}

function createOrder(order) {
  const { userId, product, quantity } = order;
  return pool.promise().query('INSERT INTO orders (user_id, product, quantity) VALUES (?, ?, ?)', [userId, product, quantity]);
}

function updateOrder(orderId, updatedOrder) {
  const { product, quantity } = updatedOrder;
  return pool.promise().query('UPDATE orders SET product = ?, quantity = ? WHERE id = ?', [product, quantity, orderId]);
}

function deleteOrder(orderId) {
  return pool.promise().query('DELETE FROM orders WHERE id = ?', [orderId]);
}

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
};
