// controllers/categoryController.js
const {Category} = require('../../models/productModel');

async function createCategory(req, res) {
  const { name,cat_url } = req.body;

  try {
    const newCategory = await Category.create({ name,cat_url });
    res.status(201).json(newCategory);
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function getAllCategories(req, res) {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    console.error('Error retrieving categories:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function getCategoryById(req, res) {
  const categoryId = req.params.id;

  try {
    const category = await Category.findByPk(categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json(category);
  } catch (error) {
    console.error('Error retrieving category:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function updateCategory(req, res) {
  // const categoryId = req.params.id;
  const { name,id } = req.body;

  try {
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    await category.update({ name });
    res.json({ message: 'Category updated successfully' });
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function deleteCategory(req, res) {
  const categoryId = req.body.id;

  try {
    const category = await Category.findByPk(categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    await category.destroy();
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
