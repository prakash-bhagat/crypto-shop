const express = require('express');
const routes = express.Router();
const orderController = require('../controllers/client/orderController');
const adminOrderController = require('../controllers/admin/orderController');
const {isClient} = require('../middleware/authMiddleware');

// Admin
routes.get('/orders', adminOrderController.getAllOrders);
routes.post('/status',adminOrderController.updateOrderAccept);
// User
routes.post('/order',isClient,orderController.getOneOrder);
routes.post('/orders', isClient ,orderController.getAllOrders);
routes.post('/placeorders', isClient, orderController.createCODOrder);
routes.get('/coins', isClient, orderController.getCurrencies);
routes.post('/min-amount', isClient, orderController.getMinimumPaymentAmount);
routes.post('/invoice', isClient, orderController.createPaymentInvoice);
routes.post('/payment', isClient, orderController.createPayment);
routes.post('/payment_status', isClient, orderController.paymentStatus);

module.exports = routes;
