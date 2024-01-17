// adminRoutes.js
const express = require('express');
const router = express.Router();
const productModel = require('../models/productModel');

// Admin route to get all products
router.get('/products', async (req, res) => {
  try {
    const products = await productModel.getAllProducts();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Admin route to get a product by ID
router.get('/products/:id', async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await productModel.getProductById(productId);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Add more admin routes as needed

module.exports = router;
