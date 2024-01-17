// routes/bannerRoutes.js
const express = require('express');
const router = express.Router();
const bannerController = require('../controllers/admin/adsController');
const userBannerController = require('../controllers/client/adsController');
const uploadFile = require('../middleware/uploadMiddleware');

// Admin routes
router.get('/banners', bannerController.getAllBanners);
router.post('/banners', bannerController.createBanner);
router.get('/banners/:id', bannerController.getBannerById);
router.put('/banners/:id', bannerController.updateBanner);
router.post('/delbanners', bannerController.deleteBanner);

// User routes
router.get('/banner', userBannerController.getAllBanners);

// image
router.post('/uploadads', uploadFile.single('image'), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    // var fullUrl = req.protocol + '://' + req.get('host');
    res.json({ message: 'File uploaded successfully', filename: req.protocol+'://'+req.get('host')+'/uploads/'+req.file.filename });
  });

module.exports = router;
