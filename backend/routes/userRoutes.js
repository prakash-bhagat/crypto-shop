const express = require('express');
const routes = express.Router();
const userController = require('../controllers/client/userController');
const {isClient} = require('../middleware/authMiddleware');

routes.get('/users', isClient,userController.getAllUsers);
routes.post('/userinfo',isClient, userController.getUserById);
routes.post('/signup', userController.createUser);
routes.post('/login', userController.loginUser);
routes.post('/updateuser',isClient,userController.updateUser);

module.exports = routes;