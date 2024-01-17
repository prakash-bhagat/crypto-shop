// productModel.js
const db = require('../config/db');

class ProductModel {
  async getAllProducts() {
    const [rows] = await db.query('SELECT * FROM products');
    return rows;
  }

  async getProductById(productId) {
    const [rows] = await db.query('SELECT * FROM products WHERE id = ?', [productId]);
    return rows[0];
  }

  // Add more methods for CRUD operations as needed
}

module.exports = new ProductModel();
