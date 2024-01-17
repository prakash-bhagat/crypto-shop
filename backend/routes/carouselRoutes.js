// routes/carouselRoutes.js
const express = require('express');
const router = express.Router();
const carouselController = require('../controllers/admin/carouselController');
const userCarouselController = require('../controllers/client/carouselController');
const uploadFile = require('../middleware/uploadMiddleware');

// Admin routes
router.get('/carousel', carouselController.getAllItems);
router.post('/carousel', carouselController.createItem);
router.get('/carousel/:id', carouselController.getItemById);
router.put('/carousel/:id', carouselController.updateItem);
router.delete('/carousel/:id', carouselController.deleteItem);

// User routes
router.get('/slider',userCarouselController.getAllItems);

router.post('/uploadcarousel', uploadFile.single('image'), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    // var fullUrl = req.protocol + '://' + req.get('host');
    res.json({ message: 'File uploaded successfully', filename: req.protocol+'://'+req.get('host')+'/uploads/'+req.file.filename });
  });

module.exports = router;
