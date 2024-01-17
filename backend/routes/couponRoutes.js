// routes/promoCodeRoutes.js

const express = require('express');
const router = express.Router();
const promoCodeController = require('../controllers/admin/couponController');
const userPromoCodeController = require('../controllers/admin/couponController');
const {isClient} = require('../middleware/authMiddleware');

// Admin routes
router.get('/promo-codes', promoCodeController.getAllPromoCodes);
router.post('/promo-codes', promoCodeController.createPromoCode);
router.delete('/promo-codes/:id', promoCodeController.deletePromoCode);

// User routes
router.post('/promo-code', userPromoCodeController.getPromoCodes);

module.exports = router;
