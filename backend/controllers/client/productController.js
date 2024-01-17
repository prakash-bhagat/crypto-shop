// controllers/productController.js
const {Product} = require('../../models/productModel');

// Get all products
async function getAllProducts(req, res) {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    console.error('Error retrieving products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Get product by ID
async function getProductById(req, res) {
  const productId = req.params.id;

  try {
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Error retrieving product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Create a new product
async function createProduct(req, res) {
  const { name, description, price, category,stock,imageUrl } = req.body;
  // console.log(req.body);

  try {
    const newProduct = await Product.create({ name, description, price,stock,imageUrl, categoryId: Number(category) });
    res.status(201).json({ message: 'Product created successfully', productId: newProduct.id });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Update an existing product by ID
async function updateProduct(req, res) {
  const productId = req.params.id;
  const { name, description, price } = req.body;

  try {
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.update({ name, description, price });
    res.json({ message: 'Product updated successfully' });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Delete a product by ID
async function deleteProduct(req, res) {
  const productId = req.params.id;

  try {
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.destroy();
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
