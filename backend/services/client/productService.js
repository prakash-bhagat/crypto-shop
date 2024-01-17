// productModel.js
const db = require('../../config/db');

// class ProductModel {
  const getAllProducts= async function() {
    const [rows] = await db.query('SELECT * FROM products');
    return rows;
  }

  const getProductById = async function(productId) {
    const [rows] = await db.query('SELECT * FROM products WHERE id = ?', [productId]);
    return rows[0];
  }

  // Add more methods for CRUD operations as needed
// }

// module.exports = new ProductModel();

module.exports = {getAllProducts,getProductById}
