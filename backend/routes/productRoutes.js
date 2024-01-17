const express = require('express');
const routes = express.Router();
const productController = require('../controllers/client/productController');
const uploadFile = require('../middleware/uploadMiddleware');

routes.get('/products', productController.getAllProducts);
routes.post('/create',productController.createProduct);
routes.get('/products/:id',productController.getProductById);

routes.post('/upload', uploadFile.single('image'), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    // var fullUrl = req.protocol + '://' + req.get('host');
    res.json({ message: 'File uploaded successfully', filename: req.protocol+'://'+req.get('host')+'/uploads/'+req.file.filename });
  });

module.exports = routes;