const jwt = require('jsonwebtoken');
const config = require('../config/config');

// Middleware to authenticate admin

const isAdmin = (req, res, next) => {
    // You may implement more robust authentication logic here
    const isAdminUser = req.headers.authorization === 'admin-secret-key';
    if (isAdminUser) {
      next();
    } else {
      res.status(403).send('Unauthorized');
    }
  };

  // Middleware to authenticate client
const isClient = (req, res, next) => {
    // You may implement more robust authentication logic here
    const isClientUser = jwt.verify(req.headers.authorization, process.env.JWT,function(err, decoded) {
      if (decoded) {
        next();
      } else {
        res.status(403).send({message:'Unauthorized',status:false});
      }
    });
  };

module.exports = {isAdmin,isClient};
