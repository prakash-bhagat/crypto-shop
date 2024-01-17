const express = require('express');
const routes = express.Router();
const categoryController = require('../controllers/client/categoryController');
const uploadFile = require('../middleware/uploadMiddleware');

routes.get('/category', categoryController.getAllCategories);
routes.post('/addcat',categoryController.createCategory);
routes.post('/deletecat',categoryController.deleteCategory);
routes.post('/update',categoryController.updateCategory);

routes.post('/uploadcat', uploadFile.single('image'), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    // var fullUrl = req.protocol + '://' + req.get('host');
    res.json({ message: 'File uploaded successfully', filename: req.protocol+'://'+req.get('host')+'/uploads/'+req.file.filename });
  });

module.exports = routes;
